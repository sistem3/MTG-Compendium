export interface Card {
  id: string;
  name: string;
  artist: string;
  legalities: any;
  power?: string;
  toughness?: string;
  layout: string;
  cmc: number;
  rarity: string;
  colors: Array<string>;
  color_identity: Array<string>;
  image_uris: any;
  mana_cost: string;
  oracle_text: string;
  type_line: string;
  flavor_text: string;
  set_name: string;
}
