import { Axial_Coordinate } from "./hex_grid";

// TODO: could possibly implement a more efficient hashmap since this
// will have specific constraints and doesn't have to be generic
export class Hex_Map {
  private tiles: Map<string, Tile>;

  private static formatter = Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
    minimumIntegerDigits: 4,
    signDisplay: "always",
  });

  private static coord_as_string(coord: Axial_Coordinate) {
    return `${Hex_Map.formatter.format(coord.q)};${Hex_Map.formatter.format(coord.r)}`;
  }

  private static parse_coord_string(str: string) {
    const parts = str.split(";");
    const q = Number.parseInt(parts[0].replace(",", ""));
    const r = Number.parseInt(parts[1].replace(",", ""));
    return new Axial_Coordinate(q, r);
  }

  // NOTE: this looks bad because it is bad but it's fine for this specific implementation
  constructor(wall: Array<Axial_Coordinate>, floor: Array<Axial_Coordinate>) {
    this.tiles = new Map();
    for (const wall_tile of wall) {
      this.tiles.set(Hex_Map.coord_as_string(wall_tile), { terrain: "wall" });
    }
    for (const floor_tile of floor) {
      this.tiles.set(Hex_Map.coord_as_string(floor_tile), { terrain: "floor" });
    }
  }

  get(coord: Axial_Coordinate) {
    return this.tiles.get(Hex_Map.coord_as_string(coord));
  }

  set(coord: Axial_Coordinate, tile: Tile) {
    this.tiles.set(Hex_Map.coord_as_string(coord), tile);
  }

  has(coord: Axial_Coordinate) {
    return this.tiles.has(Hex_Map.coord_as_string(coord));
  }

  toggle_wall(coord: Axial_Coordinate, replace: Terrain = "floor") {
    const tile_current = this.get(coord);
    if (!tile_current) {
      return false;
    }

    this.set(coord, {
      ...tile_current,
      terrain: tile_current.terrain === "wall" ? replace : "wall",
    });
    return true;
  }

  all() {
    let result = new Array<{ coord: Axial_Coordinate; tile: Tile }>();
    for (const [coord, tile] of this.tiles.entries()) {
      const parsed_coord = Hex_Map.parse_coord_string(coord)
      result.push({ coord: parsed_coord, tile });
    }
    return result;
  }
}

export type Terrain = "wall" | "floor";

// TODO: will probably want to encode more/different information
// in the tile type
export type Tile = {
  terrain: Terrain;
};
