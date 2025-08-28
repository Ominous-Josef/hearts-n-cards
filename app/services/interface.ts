export interface ICreateCard {
  title: string;
  content: string;
}

export interface ICardDoc extends ICreateCard {
  id: string;
  createdAt: Date;
}

export interface ICardFilter {
  // Add filter properties here
}
