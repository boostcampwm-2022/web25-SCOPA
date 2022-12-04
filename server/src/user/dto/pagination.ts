export class Condition {
  interest?: string;
  techStack?: object;
  _id?: object;

  constructor(
    interest?: string,
    techStack?: Array<string>,
    liked?: true,
    likes?: Array<string>,
  ) {
    if (interest) this.interest = interest;
    if (techStack?.length > 0) this.techStack = { $all: techStack };
    if (liked) {
      this._id = { $in: likes };
    }
  }
}

export class Pageable {
  sort: object = { createdAt: -1 }; // 최신순
  limit: number;
  page: number;

  constructor(limit: number, page: number, sort?: object) {
    this.limit = limit;
    this.page = page;
    if (sort) this.sort = sort;
  }
}
