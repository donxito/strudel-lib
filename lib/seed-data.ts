import { Sketch } from "./types";

// * Fixed epochs so server and client bundles match (avoids unstable module-level Date.now()).
const T0 = 1_700_000_000_000;

export const STARTER_SKETCHES: Sketch[] = [
  {
    id: "1",
    title: "Deep House Foundation",
    tags: ["house", "drums", "bass"],
    bpm: "132",
    created: T0 - 86400000 * 3,
    code: `setcps(0.55)
stack(
  s("bd*4, [~ sd]*2, [hh hh oh hh hh hh oh ~]")
    .bank("RolandTR909")
    .gain(0.8),
  note("c2 ~ [c2 ~] ~ eb2 ~ [g1 bb1] ~")
    .sound("sawtooth")
    .lpf(sine.range(400, 1200).slow(16))
    .lpq(3)
    .gain(0.5),
  chord("<Cm7 Cm7 Fm7 Fm7>")
    .voicing()
    .sound("sawtooth")
    .lpf(sine.range(600, 2500).slow(32))
    .gain(0.18)
    .room(0.4)
    .delay(0.2),
  note("<[c4 eb4 g4 bb4] [g4 f4 eb4 c4]>")
    .sound("triangle")
    .lpf(sine.range(800, 4000).slow(8))
    .gain(0.25)
    .delay(0.4)
    .delaytime("0.166")
    .room(0.5)
)`,
  },
  {
    id: "2",
    title: "Bonobo Drift",
    tags: ["downtempo", "ambient", "organic"],
    bpm: "96",
    created: T0 - 86400000 * 2,
    code: `setcps(0.4)
stack(
  s("bd ~ ~ ~ bd ~ ~ ~, ~ ~ ~ [~ sd:1] ~ ~ ~ ~, [hh ~]*4")
    .bank("RolandCR78")
    .gain(0.7)
    .room(0.3),
  note("c1 ~ ~ ~ ~ ~ ab0 ~")
    .sound("sine")
    .gain(0.55)
    .lpf(200),
  note("c2 ~ [eb2 ~] ~ ~ [g1 ~] ~ ab1")
    .sound("sawtooth")
    .lpf(sine.range(200, 900).slow(16))
    .lpq(4)
    .gain(0.3)
    .room(0.2),
  note("<[c4 ~ eb4 ~] [~ g4 ~ bb4]>")
    .sound("triangle")
    .lpf(sine.range(1000, 3500).slow(24))
    .gain(0.15)
    .delay(0.5)
    .delaytime("0.375")
    .room(0.7)
)`,
  },
  {
    id: "3",
    title: "Minimal Kick",
    tags: ["minimal", "drums"],
    bpm: "120",
    created: T0 - 86400000,
    code: `setcps(0.5)
s("bd sd hh cp").bank("RolandTR808")`,
  },
];
