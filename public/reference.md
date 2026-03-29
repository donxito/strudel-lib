# My Strudel Reference

> My own docs. Built from what I've actually used, not the full API.
> If it's here, it's because I tested it and it worked.

---

## The Basics

### Tempo

```js
setcps(0.5); // cycles per second — this is how you set BPM
```

| cps   | ≈ BPM | vibe                      |
| ----- | ----- | ------------------------- |
| 0.4   | 96    | lo-fi, downtempo, Bonobo  |
| 0.45  | 108   | slow house, Kiasmos       |
| 0.5   | 120   | house, pop                |
| 0.52  | 125   | Thylacine, melodic techno |
| 0.55  | 132   | techno, Moderat           |
| 0.575 | 138   | faster techno             |
| 0.625 | 150   | drum & bass               |
| 0.7   | 168   | jungle                    |

Formula: BPM = cps × 60 × 2 (for 4/4 time)

### Playing Sounds

```js
s("bd sd hh cp"); // play samples by name
s("bd sd").bank("RolandTR909"); // use a specific drum machine

// my favorite banks:
// "RolandTR808"  — deep, heavy, classic hip-hop/techno
// "RolandTR909"  — punchy, sharp, the house/techno standard
// "RolandCR78"   — dusty, warm, organic — perfect for Bonobo/Apparat
```

### Notes & Synths

```js
note("c3 e3 g3 b3"); // notes (letter + octave)
note("c3").sound("sawtooth"); // note with synth type
note("c3").s("piano"); // note with sample

// synth waveforms:
// "sine"      — pure, clean, sub-bass and pads
// "triangle"  — soft, warm, good for leads
// "sawtooth"  — buzzy, rich, classic synth bass and pads
// "square"    — hollow, woody, 8-bit vibes
```

---

## Mini-Notation — The Pattern Language

This is Strudel's secret weapon. Everything inside the quotes is mini-notation.

### Sequencing

```js
"bd sd hh cp"; // play in order, equally spaced in one cycle
"bd sd"; // 2 events per cycle (each gets half)
"bd sd hh cp oh"; // 5 events per cycle (each gets 1/5)
```

### Speed Up / Repeat

```js
"hh*8"; // 8 hats per cycle (16th notes at normal tempo)
"hh*16"; // 32nd notes — very fast shimmer
"bd*2"; // 2 kicks per cycle
```

### Slow Down

```js
"bd sd" / 2; // takes 2 cycles to play the whole sequence
"bd sd hh cp" / 4; // takes 4 cycles — very slow
```

### Subsequence (Subdivide)

```js
"[bd sd] hh"; // bd and sd share the first half, hh gets second half
"bd [hh hh hh]"; // kick then 3 hats crammed into the same space
"[bd bd] [sd [hh hh]]"; // nesting works — gets complex fast
```

### Alternate Each Cycle

```js
"<bd sd>"; // cycle 1: bd, cycle 2: sd, cycle 3: bd...
"<c3 eb3 g3 bb3>"; // plays one note per cycle, rotating
"<bd [bd bd]>"; // alternates between 1 kick and 2 kicks
```

### Rest / Silence

```js
"bd ~ sd ~"; // ~ = silence. classic boom-bap spacing
"~ sd"; // snare only on beat 2 (half-time backbeat)
```

### Stack / Layer (Play Simultaneously)

```js
"bd sd, hh*4"; // comma = play both at the same time
"bd*4, ~ sd, hh*8"; // three layers in one pattern string
// this is a shortcut for stack() — same result:
stack(s("bd*4"), s("~ sd"), s("hh*8"));
```

### Euclidean Rhythms

```js
"hh(3,8)"; // 3 hits spread evenly across 8 slots
"bd(5,8)"; // 5 of 8 — dense, funky
"cp(2,5)"; // 2 of 5 — sparse, odd meter feel
```

These come from Bjorklund's algorithm — they naturally create rhythms found in West African, Middle Eastern, and Latin music. Always sound good.

| Pattern | Feel                           |
| ------- | ------------------------------ |
| (3,8)   | Cuban tresillo, reggaeton      |
| (5,8)   | West African bell pattern      |
| (7,8)   | Almost full, one gap — tension |
| (3,4)   | Waltz-like                     |
| (5,16)  | Sparse, scattered              |
| (7,12)  | Complex, polyrhythmic          |
| (2,5)   | Irregular, interesting         |

### Random / Probability

```js
"bd sd?"; // ? = 50% chance to play
"bd sd?0.3"; // 30% chance
"hh*8?"; // each hat flip a coin independently
"bd | sd | cp"; // randomly choose ONE of these each cycle
```

### Repeat and Extend

```js
"bd!3 sd"; // repeat: bd bd bd sd (4 equal events)
"bd@3 sd"; // extend: bd gets 3x the duration, sd gets 1x
```

---

## Effects — Making Things Sound Good

### Volume & Dynamics

```js
.gain(0.5)                          // volume: 0 = silent, 1 = full
.gain("0.9 0.5 0.7 0.5")           // per-step volume = accents/groove
.gain(perlin.range(0.3, 0.8))      // organic random dynamics
```

### Filters — The Most Important Effect

```js
.lpf(800)             // low-pass filter at 800Hz — cuts highs, makes things warm/dark
.hpf(200)             // high-pass filter at 200Hz — cuts lows, makes things thin/airy
.bpf(1000)            // band-pass — cuts both extremes, nasal/telephone sound
.lpq(5)               // resonance on the filter — higher = more squelchy
```

Filter resonance (.lpq) guide:
| Value | Sound |
|-------|-------|
| 1-2 | subtle, warm |
| 3-5 | noticeable, musical |
| 6-10 | squelchy, acid-ish |
| 10-15 | screaming, razor-sharp |
| 15+ | self-oscillating, careful |

Animated filters (this is where it gets good):

```js
.lpf(sine.range(200, 2000).slow(8))   // filter sweeps up and down over 8 cycles
.lpf(sine.range(200, 2000).slow(4))   // faster sweep
.lpf(saw.range(200, 2000).slow(8))    // filter opens then snaps shut (sawtooth)
.lpf(perlin.range(300, 1500).slow(4)) // random organic filter movement
```

### Delay

```js
.delay(0.5)            // how much delayed signal (wet/dry mix)
.delaytime(0.25)       // delay time — in fractions of a cycle
.delayfeedback(0.5)    // how many echoes (0 = one, 0.9 = tons, careful above 0.85)
```

Golden delay times:
| Value | Musical term | Feel |
|-------|-------------|------|
| 0.25 | straight eighth | tight, precise |
| 0.333 | triplet | swing, jazz |
| 0.375 | dotted eighth | organic, dub — THE delay time for Bonobo/Thylacine |
| 0.5 | quarter note | spacious, echo-y |
| "0.25 0.5" | alternating | complex, unpredictable |

### Reverb

```js
.room(0.5)             // reverb amount: 0 = dry, 1 = cathedral
.roomsize(3)           // size of the space: 1 = closet, 10 = cavern
```

Guide:
| room | vibe |
|------|------|
| 0.1-0.2 | subtle glue, just enough |
| 0.3-0.5 | noticeable space, nice for drums |
| 0.6-0.8 | atmospheric, pads and textures |
| 0.9-1.0 | massive, shoegaze/ambient territory |

### Distortion & Saturation

```js
.shape(0.3)            // waveshaping — warm saturation like analog gear
                       // 0.1-0.3 = warm tape, 0.4-0.6 = crunchy, 0.7+ = heavy distortion
.crush(4)              // bitcrusher — lo-fi digital destruction (lower = crunchier)
.coarse(8)             // sample rate reduction — pair with crush for lo-fi
```

### Stereo & Panning

```js
.pan(0)                // center
.pan(-1)               // hard left
.pan(1)                // hard right
.pan("0 1 -1 0.5")    // different position each hit
.pan(sine.slow(4))     // auto-pan left to right
.pan(rand)             // random position each hit — scattered
```

### Sample Manipulation

```js
.speed(2)              // play sample at 2x speed (pitched up one octave)
.speed(0.5)            // half speed (pitched down one octave)
.speed(-1)             // play backwards
.begin(0.25)           // start playback at 25% into the sample
.end(0.5)              // stop playback at 50%
.cut(1)                // cut group — new sound in group 1 cuts off previous
.release(0.1)          // fade out time in seconds
```

### Vowel Filter

```js
.vowel("a e i o")      // formant filter — makes synths sound vocal
.vowel("a")            // single vowel — open, airy
.vowel("<a e i o u>")  // cycle through vowels
```

---

## Signals — Modulation & Movement

Signals are continuous values you use to animate parameters over time. This is what makes things feel alive.

```js
sine; // smooth wave: 0 → 1 → 0 → -1 → 0
cosine; // same but shifted 90°
saw; // ramp up then snap down
tri; // triangle wave (like sine but pointy)
square; // on/off, no in-between
rand; // random value each event (jumpy)
perlin; // smooth random (organic, human-feeling)
```

### Using Signals

```js
// .range(min, max) — scale the signal to useful values
.lpf(sine.range(200, 2000))       // filter sweeps between 200-2000Hz
.gain(perlin.range(0.3, 0.8))     // volume varies organically

// .slow(N) — slow the signal down by N cycles
.lpf(sine.range(200, 2000).slow(8))  // takes 8 cycles for one full sweep
.lpf(sine.range(200, 2000).slow(32)) // super slow, barely noticeable

// .fast(N) — speed it up
.gain(sine.range(0, 0.5).fast(4))    // tremolo effect (4x per cycle)
```

### When to Use What

| Signal | Use for                                                      |
| ------ | ------------------------------------------------------------ |
| sine   | smooth sweeps, filter movement, auto-pan                     |
| perlin | humanizing — gain, timing, anything that should feel organic |
| rand   | scattered effects — pan, pitch variation, hat dynamics       |
| saw    | rising tension — filter that opens and snaps shut            |
| square | gating — hard on/off effects                                 |

---

## Pattern Transformations — The Fun Stuff

These are functions you chain onto patterns to transform them. This is where Strudel gets really powerful.

### Time

```js
.fast(2)               // double speed
.slow(2)               // half speed
.rev()                 // reverse the pattern
.early(0.25)           // shift pattern earlier by 1/4 cycle
.late(0.25)            // shift pattern later
```

### Conditional / Periodic

```js
.every(4, fast(2))           // every 4th cycle, go double speed
.every(3, rev)               // every 3rd cycle, reverse it
.every(8, x => x.speed(2))  // every 8th cycle, pitch up

.sometimes(rev)              // ~50% chance to reverse each cycle
.often(fast(2))              // ~75% chance
.rarely(rev)                 // ~10% chance
.almostNever(fast(2))        // ~2.5% chance — very subtle variation
.sometimesBy(0.3, rev)       // 30% chance (you control)
```

### Chopping & Rearranging

```js
.chunk(4, rev)         // split into 4 chunks, reverse one at a time (rotating)
                       // cycle 1: [REV][2][3][4]
                       // cycle 2: [1][REV][3][4]
                       // cycle 3: [1][2][REV][4] — great glitchy variation

.striate(4)            // chop sound into 4 slices, rearrange
                       // subtle on synths, wild on samples and drums
```

### Probability & Degradation

```js
.degradeBy(0.3)        // 30% of events get dropped (like ? but controllable)
.degradeBy(0.7)        // 70% dropped — very sparse
.mask("<1 1 0 1>")     // mute on specific cycles (0 = silent cycle)
                       // great for creating breathing room / build-ups
```

### Layering & Copying

```js
// .jux(fn) — plays original in left, transformed version in right
.jux(rev)              // forward in left ear, reversed in right = instant stereo width
.jux(x => x.fast(2))  // normal speed left, double speed right = polyrhythm
.jux(x => x.note(7))  // original left, transposed right = harmony

// .superimpose(fn) — plays original AND a transformed copy (both center)
.superimpose(x => x.note(12))          // add octave above
.superimpose(x => x.slow(2).gain(0.5)) // add half-speed ghost layer
.superimpose(x => x.note(7).delay(0.3)) // add a 5th with delay

// .off(time, fn) — plays a time-shifted transformed copy alongside original
.off(0.125, x => x.note(7))     // canon effect — melody + delayed harmony
.off(0.25, x => x.gain(0.5))    // echo at quarter cycle
.off("0.125 0.25", x => x.note(5).gain(0.4))  // alternating offsets
```

### Arpeggios

```js
// turn chords into arpeggios
note("[c4,e4,g4,b4]").arp("up"); // low to high
note("[c4,e4,g4,b4]").arp("down"); // high to low
note("[c4,e4,g4,b4]").arp("updown"); // up then down
note("[c4,e4,g4,b4]").arp("random"); // random order
note("[c4,e4,g4,b4]").arp("converge"); // outside in
note("[c4,e4,g4,b4]").arp("diverge"); // inside out

// speed up the arp
note("[c4,e4,g4,b4]").arp("up").fast(4); // 16th note arpeggios — Thylacine vibes
```

### Euclidean Rhythm as Gate

```js
// .struct() — applies a rhythmic structure to any pattern
.struct("t(5,8)")      // gates your notes with a 5-over-8 euclidean rhythm
.struct("t(3,8)")      // sparser
.struct("t*4")         // straight four hits
.struct("t f t f t f t t") // manual on/off pattern (t=true, f=false)
```

### Rotation

```js
.rotate(1)             // shift the euclidean pattern by 1 step
.rotate(2)             // shift by 2 — same hits, different groove
                       // try on euclidean rhythms: s("bd(3,8)").rotate(1)
```

---

## Structure — Building a Track

### stack() — Play Layers Simultaneously

```js
// this is how you build a full track — stack all your layers
stack(
  s("bd*4").bank("RolandTR909"), // kick
  s("~ sd").bank("RolandTR909"), // snare
  s("hh*8").bank("RolandTR909").gain(0.3), // hats
  note("c2 ~ eb2 ~").sound("sawtooth"), // bass
  note("c4 eb4 g4").sound("sine").gain(0.2), // lead
);
```

### cat() — Play Patterns One After Another

```js
// cat() plays each pattern for one cycle, then moves to the next
cat(
  s("bd*4"), // cycle 1: just kick
  s("bd*4, hh*8"), // cycle 2: kick + hats
  s("bd*4, hh*8, ~ sd"), // cycle 3: full beat
);
// great for building arrangements and intros
```

### .orbit() — Separate Effects Buses

```js
// by default everything shares the same reverb/delay
// .orbit(N) sends sounds to different effects channels
s("bd*4").orbit(0); // drums: dry
note("c4 eb4").delay(0.5).orbit(1); // lead: wet delay
note("c3").room(0.8).orbit(2); // pad: big reverb
// now the drum reverb doesn't muddy up the bass
```

---

## Music Theory Cheat Sheet

### Scales — What Notes Go Together

All notes in these scales sound good together. Pick one and stick to it.

```
Pentatonic minor: c  eb  f  g  bb     ← can't go wrong, always sounds good
Pentatonic major: c  d  e  g  a      ← same safety net but bright/warm (Emancipator vibes)
Natural minor:    c  d  eb  f  g  ab  bb  ← moody, deep, Moderat/Apparat
Blues:            c  eb  f  f#  g  bb  ← classic blues/soul feel
Major:           c  d  e  f  g  a  b  ← bright, uplifting
Dorian:          c  d  eb  f  g  a  bb  ← minor but less dark, jazzy house
```

You can start on any root note, just keep the intervals. For now, stick to C (no sharps/flats to think about).

### Chords — Quick Reference

```js
// minor chords (dark, emotional)
note("[c3,eb3,g3]"); // Cm
note("[f2,ab2,c3]"); // Fm
note("[g2,bb2,d3]"); // Gm

// minor 7ths (jazzy, deep house)
note("[c3,eb3,g3,bb3]"); // Cm7
note("[f2,ab2,c3,eb3]"); // Fm7
note("[g2,bb2,d3,f3]"); // Gm7

// major chords (bright)
note("[c3,e3,g3]"); // C
note("[f2,a2,c3]"); // F
note("[g2,b2,d3]"); // G

// major 7ths (warm, cinematic, Emancipator/Nym sunny side)
note("[c3,e3,g3,b3]"); // Cmaj7
note("[f2,a2,c3,e3]"); // Fmaj7
note("[a2,c3,e3,g3]"); // Am7
note("[d3,f3,a3,c4]"); // Dm7
```

### Classic Progressions

```js
// dark minimal (Kiasmos, Apparat)
note("<[c3,eb3,g3] [ab2,c3,eb3]>").slow(2);

// deep house
note("<[c3,eb3,g3,bb3] [f2,ab2,c3,eb3] [ab2,c3,eb3,g3] [g2,bb2,d3,f3]>");

// emotional techno (Moderat)
note("<[c3,eb3,g3] [ab2,c3,eb3] [f2,ab2,c3] [g2,bb2,d3]>");

// uplifting (Thylacine)
note("<[c3,eb3,g3,bb3] [f3,ab3,c4] [g3,bb3,d4]>");

// warm cinematic trip-hop (Emancipator, Nym sunny side)
note("<[c3,e3,g3,b3] [f2,a2,c3,e3] [a2,c3,e3,g3] [d3,f3,a3,c4]>");

// dark trip-hop (Massive Attack, Portishead)
note("<[c3,eb3,g3] [ab2,c3,eb3]>").slow(2);
```

### Classic Drum Patterns

```js
// four-on-the-floor (house/techno) — kick every beat
s("bd*4, ~ sd, hh*8");

// broken beat (Apparat, Bonobo)
s("bd ~ ~ bd, ~ sd? ~ ~, hh(5,8)");

// halftime (downtempo, trip-hop)
s("bd ~ ~ ~, ~ ~ sd ~, hh*4");

// syncopated (Moderat)
s("bd ~ bd ~ ~ bd ~ ~, ~ cp, hh*16");

// trip-hop / MPC boom-bap (Nym, Apanemic)
s("bd ~ ~ bd ~ ~ bd ~, ~ ~ sd ~, hh(5,8)");

// sparse menacing (Massive Attack)
s("bd ~ ~ ~ bd ~ ~ ~, ~ ~ ~ ~ sd ~ ~ ~, hh(3,8)");

// noir / broken (Portishead)
s("bd ~ bd ~ ~ ~ bd ~, ~ ~ sd? ~, hh(5,8)");
```

---

## Recipes — Artist-Specific Tricks

### Bonobo Sound

```
✓ RolandCR78 drums
✓ perlin on gain (humanize everything)
✓ delaytime(0.375) — dotted eighth delay
✓ degradeBy() — notes dropping out randomly
✓ sine LFO on filter, .slow(8) or slower
✓ pentatonic minor scale
✓ tempo: 0.42-0.48 cps
```

### Moderat Sound

```
✓ RolandTR909 drums
✓ .shape() on everything — warm saturation
✓ .lpq(6+) on bass — acid resonance
✓ .every(4, fast(2)) — periodic intensity
✓ sawtooth pads with slow filter sweeps
✓ dark minor chords, slow chord changes
✓ tempo: 0.5-0.55 cps
```

### Apparat Sound

```
✓ RolandCR78 drums
✓ ? on everything — broken, sparse
✓ .chunk(4, rev) — glitchy melodic fragments
✓ .mask("<1 1 0 1>") — whole cycles go silent
✓ .off() — canon/echo melodies
✓ high reverb, high delay
✓ triangle waves, very quiet high layers
✓ tempo: 0.43-0.48 cps
```

### Kiasmos Sound

```
✓ RolandTR808 kick, minimal hats
✓ ONE melody note with lots of delay doing the work
✓ .delayfeedback(0.6) — long echo tails
✓ .delaytime(0.333) — triplet delays
✓ patience — .slow(4) on chords, let things breathe
✓ triangle wave leads, sine sub-bass
✓ tempo: 0.47-0.52 cps
```

### Thylacine Sound

```
✓ RolandTR909 drums
✓ .arp("up").fast(4) — 16th note arpeggios
✓ .struct("t(5,8)") — euclidean gating on bass
✓ .superimpose(x => x.note(12)) — octave doubling
✓ sawtooth arps with moving filter + resonance
✓ .rotate() on euclidean patterns
✓ tempo: 0.5-0.55 cps
```

### Nym / Apanemic Sound (Cinematic Trip-Hop)

Both are MPC-based, sample-digging producers. Nym (Alaska/Durham NC) blends vinyl samples
with live instruments for cinematic, introspective downtempo. Apanemic (Ioannina, Greece)
uses an Akai MPC 2000XL sampling strictly from old vinyl — dusty, groovy, retro hip-hop
instrumentals. Both sit in the Bonobo/Emancipator/Portishead neighborhood but with more
hip-hop DNA and that "old record in a dusty room" warmth.

```
✓ TR808 kick + CR78 snare/hats — deep boom + dusty textures
✓ NOT four-on-the-floor — hip-hop spacing: "bd ~ ~ bd, ~ ~ bd ~" or "bd ~ ~ bd ~ ~ bd ~"
✓ halftime snare: "~ ~ sd ~" — beat 3 only, with room reverb tail
✓ .shape(0.2-0.3) on everything — warm tape saturation, MPC-through-vinyl feel
✓ perlin on hat gain — finger-drummed MPC dynamics
✓ .sometimes(fast(2)) on hats — occasional MPC stutter/roll
✓ sine bass, NOT sawtooth — pure sub weight, simple bouncy lines with gaps
✓ minor 7th chords on sine/triangle — dusty jazz-sample feeling
✓ .degradeBy(0.2-0.5) on melodies — chopped sample fragments, not full phrases
✓ .off(0.125, ...) on melody — ghostly echo of the chop, like a second sample layer
✓ delaytime(0.375) — dotted eighth, dub-influenced delay tails
✓ high room reverb on atmosphere layers — cinematic depth
✓ hh*16 at very low gain + hpf(8000) + pan(rand) — vinyl crackle/room shimmer texture
✓ pentatonic minor — c eb f g bb (everything fits, nothing clashes)
✓ tempo: 0.35-0.4 cps (84-96 BPM) — slower than Bonobo, classic trip-hop zone
```

### Massive Attack Sound

```
✓ TR808 drums — deep, heavy, minimal hits
✓ SPARSE kick patterns — "bd ~ ~ ~ bd ~ ~ ~" — the silence IS the track
✓ one snare hit with big roomsize(5) reverb — cavernous crack
✓ sine sub-bass with shape(0.4) — the bass should feel physical
✓ barely any notes in the bass — 2-3 per cycle max, let them ring
✓ one dark chord that barely moves — just sits there and broods
✓ sawtooth pad through very dark lpf (200-1200 range)
✓ melody is optional — when it's there, degradeBy(0.6) so it's mostly fragments
✓ delay does the heavy lifting — delayfeedback(0.6) for long tails
✓ everything saturated with shape() — warm, not clean
✓ tempo: 0.33-0.37 cps (79-89 BPM) — deliberately slow, dragging
```

### Portishead Sound

```
✓ TR808 kick + CR78 snare — boom + crack
✓ shape(0.5) on kick — really pushed, like through a cheap amp
✓ snare with ? — when it drops out, the gap is unsettling
✓ sometimes(fast(2)) on hats — tape-glitch-style stutters
✓ perlin on hat lpf — some hits dull, some bright, like old vinyl
✓ square wave bass with .vowel("o") — hollow, menacing, almost vocal
✓ hh*16 at near-zero gain + hpf(9000) + pan(rand) — broken record player surface noise
✓ .superimpose() on chords — ghostly delayed double transposed by a 4th or 5th
✓ .chunk(4, rev) on melody — sounds haunted, like a sample playing backwards
✓ natural minor scale: c d eb f g ab bb — darker than pentatonic, use ab a lot
✓ tempo: 0.35-0.39 cps (84-94 BPM) — noir, nocturnal
```

### Emancipator / Nym Warm Sound

```
✓ RolandCR78 drums — gentle, organic, nothing aggressive
✓ NO shape on drums — clean and soft, not saturated
✓ hh(7,8) = almost full euclidean, busy but not mechanical, jazzy
✓ sine bass with more melodic movement — this bass actually has a melody
✓ release(0.2) on bass — notes fade out instead of cutting
✓ MAJOR 7th chords — Cmaj7 → Fmaj7 → Am7 → Dm7 — this is where the warmth comes from
✓ triangle wave for chords — softer than sawtooth
✓ pentatonic MAJOR scale: c d e g a — same safety net as minor but bright
✓ .off(0.125) on melody — the Emancipator thing, melodies layer on themselves
✓ delayfeedback(0.4) — shorter tails than dark trip-hop, cleaner
✓ shaker shimmer layer — hh*16 quiet + hpf(8000) + pan(rand) — adds air
✓ tempo: 0.37-0.42 cps (89-101 BPM) — slightly faster than dark trip-hop
```

---

## My Gotchas & Lessons Learned

1. **Multiple sounds must be inside `stack()`** — if you just write two lines, only the last one plays
2. **`setcps()` goes OUTSIDE `stack()`** — put it on line 1
3. **Ctrl+Enter to play, Ctrl+. to stop** — muscle memory this
4. **Start with one layer, get it sounding right, then add the next** — don't build everything at once
5. **Less is more** — Kiasmos proves you can make a whole track with one note and a delay
6. **Use .orbit()** when reverb gets muddy — separate your effects buses
7. **perlin > rand** for anything that should feel human (gain, filter, timing)
8. **Pentatonic minor (c eb f g bb)** is your safety net — you literally cannot hit a wrong note
9. **0.375 is the magic delay time** — dotted eighth. Use it everywhere.
10. **If it sounds boring, add .jux(rev)** — instant width and interest
11. **square wave bass + .vowel("o")** — hollow, menacing, almost vocal. great for dark trip-hop
12. **.superimpose() on chords with .note(5) and delay** — ghostly doubled harmony, sounds like two samples stacked
13. **pentatonic major (c d e g a)** exists — same safety net as minor but warm/hopeful instead of dark
14. **major 7th chords change everything** — same track structure, swap minor for major 7ths, completely different mood
15. **in trip-hop, silence is an instrument** — the gaps between kicks matter more than the kicks

---

## What I Want to Learn Next

- [ ] Loading custom samples (field recordings, my own sounds)
- [ ] More complex arrangements with cat() for intro/verse/chorus
- [ ] .striate() and granular stuff on longer samples
- [ ] Connecting Strudel to MIDI for hardware synths
- [ ] The .voicing() system for automatic chord voicings
- [ ] Recording/exporting audio from Strudel
