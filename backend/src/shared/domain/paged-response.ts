export class PagedResponse<T> {
    data: T[];
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
  
    constructor(data: T[], totalCount: number, pageIndex: number, pageSize: number) {
      this.data = data;
      this.totalCount = totalCount;
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.totalPages = Math.ceil(totalCount / pageSize);
    }
  }
  