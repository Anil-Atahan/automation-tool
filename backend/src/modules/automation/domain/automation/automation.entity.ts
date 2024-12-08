import { BaseEntity } from '../../../../shared/domain/base.entity';
import { Scenario } from './models/scenario';
import { deleteFromCache } from '../../../../shared/infrastructure/caching/cache';

export class Automation extends BaseEntity {
    private constructor(
      id: string,
      private _name: string,
      private _url: string,
      private _scenario: Scenario,
      createdAt: Date,
      private _userAgent?: string,
      updatedAt?: Date,
    ) {
      super(id, createdAt, updatedAt);
    }

    get name(): string {
      return this._name;
    }

    private set name(value: string) {
      this._name = value;
    }

    get url(): string {
      return this._url;
    }

    private set url(value: string) {
      this._url = value;
    }

    get scenario(): Scenario {
      return this._scenario;
    }

    private set scenario(value: Scenario) {
      this._scenario = value;
    }

    get userAgent(): string | undefined {
      return this._userAgent;
    }

    private set userAgent(value: string | undefined) {
      this._userAgent = value;
    }
  
    update(newName: string, newUrl: string, newScenario: Scenario, newUserAgent?: string): void {
      this.name = newName;
      this.url = newUrl;
      this.scenario = newScenario;
      this.userAgent = newUserAgent;
      this.updatedAt = new Date();

      deleteFromCache('GetAutomations');
    }

    static create(name: string, url: string, scenario: Scenario, userAgent?: string): Automation {
      const automation = new Automation(
        crypto.randomUUID(),
        name,
        url,
        scenario,
        new Date(),
        userAgent,
      );

      deleteFromCache('GetAutomations');
  
      return automation;
    }

    static fromPersistence(
      id: string,
      name: string,
      url: string,
      scenario: Scenario,
      createdAt: Date,
      userAgent?: string,
      updatedAt?: Date
    ): Automation {
      return new Automation(id, name, url, scenario, createdAt, userAgent, updatedAt);
    }
  }
  