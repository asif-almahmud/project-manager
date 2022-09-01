export type Boards = IBoard[];

export interface IBoard {
  id: string;
  title: string;
  columns: Columns;
}

export type Columns = IColumn[];

export interface IColumn {
  id: string;
  title: string;
  cards: Cards;
}

export type Cards = ICard[];

export interface ICard {
  id: string;
  title: string;
  details?: string;
}
