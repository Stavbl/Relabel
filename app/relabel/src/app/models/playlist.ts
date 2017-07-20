import { Track } from "../models/track";
export class Playlist {
    name: string;
    // tracks: { [name: string]: Track };
    tracks: Track[];

    constructor(data: Track[] & { name: string }) {
        this.name = data.name;
        this.tracks = [];

        Object.keys(data).forEach(name => {
              if (name !== "name") {
                    this.tracks[name] = new Track();
              }
        });
  }
}

