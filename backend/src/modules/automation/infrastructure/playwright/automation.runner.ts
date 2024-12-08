import { chromium, Page } from 'playwright';
import { Automation } from '../../domain/automation/automation.entity';
import { Result } from '../../../../shared/domain/result';
import { AutomationResult } from '../../domain/automation-result/automation_result.entity';
import { AutomationStatus } from '../../domain/enums/automation-status';
import { Scenario } from '../../domain/automation/models/scenario';
import logger from '../../../../shared/infrastructure/logger/logger';

export class AutomationRunner {
  static async runTask(automation: Automation): Promise<Result<AutomationResult>> {
    let executionResult = false;
    let executionTime = 0;
    let failureImage = new Uint8Array();
    try {
      const browser = await chromium.launch({ headless: true });
      const contextOptions: any = {};
      if (automation.userAgent) {
          contextOptions.userAgent = automation.userAgent;
          contextOptions.timeout = 5000;
      }
      const context = await browser.newContext(contextOptions);
      const page = await context.newPage();

      const startTime = Date.now();

      await page.goto(automation.url, {
          waitUntil: 'networkidle',
          timeout: 5000
      });

      executionResult = await this.executeScenarioAsync(page, automation.scenario);

      executionTime = Date.now() - startTime;

      if (!executionResult) {
          const screenshotBuffer = await page.screenshot({ fullPage: true, path: 'failure.png' });
          failureImage = new Uint8Array(screenshotBuffer);
      }

      await browser.close();
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Error: ${error.message}`);
        } else {
            logger.error('Unknown error occurred');
        }
    }

    const result = AutomationResult.create(
      automation.id,
      executionResult ? AutomationStatus.Success : AutomationStatus.Failure,
      executionTime,
      failureImage);

    return Result.ok(result);
  }

  private static async executeScenarioAsync(page: Page, scenario: Scenario) : Promise<boolean> {
    for (const step of scenario.scenarioSteps) {
        try {
            const locator = step.cssSelector
            ? page.locator(step.cssSelector)
            : page.locator(step.xPathSelector);

            const elementExists = await locator.count() > 0;
            if (!elementExists) {
            logger.error(`Element not found: ${step.cssSelector || step.xPathSelector}`);
            return false;
            }

            switch (step.action) {
            case 'Click':
                await locator.click();
                break;

            case 'Type':
                if (!step.expectedText || step.expectedText.trim() === '') {
                logger.error("ExpectedText is required for ActionType 'Type'");
                return false;
                }
                await locator.fill(step.expectedText);
                break;

            case 'Verify':
                const textContent = await locator.textContent();
                if (textContent?.trim() !== step.expectedText.trim()) {
                logger.error(`Text verification failed for element: ${step.cssSelector || step.xPathSelector}`);
                return false;
                }
                break;

            default:
                logger.error(`Unsupported ActionType: ${step.action}`);
                return false;
            }
        } catch (error) {
            if (error instanceof Error) {
            logger.error(`Error in Scenario Step: ${error.message}`);
            } else {
            logger.error('Unknown error occurred in Scenario Step');
            }
            return false;
        }
    }

    return true;
  }

}



