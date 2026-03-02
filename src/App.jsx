import { useState, useEffect, useRef } from "react";

// ─── MUSCLE GROUPS ────────────────────────────────────────────────────────────

const MUSCLE_GROUPS = {
  chest:     { label: "Chest",     color: "#e05c5c" },
  back:      { label: "Back",      color: "#5c8fe0" },
  shoulders: { label: "Shoulders", color: "#e0a85c" },
  biceps:    { label: "Biceps",    color: "#5ce08f" },
  triceps:   { label: "Triceps",   color: "#a85ce0" },
  legs:      { label: "Legs",      color: "#e0d45c" },
  core:      { label: "Core",      color: "#5ce0d4" },
  glutes:    { label: "Glutes",    color: "#e07a5c" },
  calves:    { label: "Calves",    color: "#d4a0e0" },
  forearms:  { label: "Forearms",  color: "#a0c8e0" },
};

// ─── EXERCISES ────────────────────────────────────────────────────────────────

const EXERCISES = [
  // ── CHEST ──────────────────────────────────────────────────────────────────
  {
    id: "bench_press",
    name: "Barbell Bench Press",
    group: "chest", secondary: ["triceps","shoulders"],
    difficulty: "Intermediate", equipment: "Barbell + Bench", type: "Compound",
    sets: "3–5", reps: "5–8", rest: "2–3 min",
    why: "The bench press is the king of upper-body pressing. It recruits the entire pectoral muscle (both clavicular and sternal heads), anterior deltoids, and triceps in one coordinated push. Heavy loading drives maximum mechanical tension — the primary driver of hypertrophy — across the chest.",
    science: "Research consistently shows the bench press produces high chest EMG activation (Trebs et al., 2010). Heavy compound pressing also triggers a significant anabolic hormonal response (testosterone + GH release) compared to machine work alone.",
    cues: ["Lie flat, eyes under the bar. Grip slightly wider than shoulder-width.", "Retract and depress shoulder blades — 'squeeze your back into the bench'.", "Arch naturally. Feet flat on the floor.", "Lower bar with control to mid-chest (nipple line).", "Drive feet into the floor as you press. Think 'push the bench away'.", "Lockout without slamming elbows. Exhale on the press."],
    mistakes: ["Flared elbows (45° is ideal)", "Bouncing the bar off the chest", "Lifting hips off the bench"],
    progressions: ["Push-up → Dumbbell Press → Barbell Bench"],
  },
  {
    id: "incline_db_press",
    name: "Incline Dumbbell Press",
    group: "chest", secondary: ["triceps","shoulders"],
    difficulty: "Beginner", equipment: "Dumbbells + Incline Bench", type: "Compound",
    sets: "3–4", reps: "8–12", rest: "90 sec",
    why: "The upper chest (clavicular head) is often underdeveloped because flat pressing emphasizes the mid/lower pec. Setting the bench at 30–45° shifts force to target upper fibers. Dumbbells also allow greater range of motion than a barbell.",
    science: "EMG studies (Barnett et al., 1995) show upper chest activation increases significantly at 30–45° incline. Greater ROM produces more stretch-mediated hypertrophy.",
    cues: ["Set bench to 30–45° (not 60° — too much shoulder stress).", "Press dumbbells up and slightly inward — converge at the top.", "Control the descent; feel the stretch in your upper chest.", "Don't let elbows drop below bench level."],
    mistakes: ["Incline too steep (becomes a shoulder exercise)", "Touching dumbbells at top (loses tension)"],
    progressions: ["Incline Push-up → Incline DB Press → Incline Barbell Press"],
  },
  {
    id: "cable_fly",
    name: "Cable Chest Fly",
    group: "chest", secondary: [],
    difficulty: "Beginner", equipment: "Cable Machine", type: "Isolation",
    sets: "3", reps: "12–15", rest: "60 sec",
    why: "Flyes isolate the pecs by removing triceps from the movement. The cable maintains constant tension throughout the full ROM — unlike dumbbells that lose tension at the top. Excellent as a finishing exercise to 'feel' the chest and create metabolic stress.",
    science: "Stretched positions (arms wide) place the pec under significant tension — this 'long muscle length' loading is highly effective for hypertrophy (Pedrosa et al., 2022).",
    cues: ["Set cables at chest height. Step forward into a slight lunge.", "With a soft elbow bend, arc handles together in a hugging motion.", "Pause and squeeze at center.", "Return slowly — feel the stretch."],
    mistakes: ["Bending arms too much (turns into a press)", "Using momentum"],
    progressions: ["Dumbbell Fly → Cable Fly → Pec Deck Machine"],
  },
  {
    id: "dips",
    name: "Chest Dips",
    group: "chest", secondary: ["triceps","shoulders"],
    difficulty: "Intermediate", equipment: "Dip Bars", type: "Compound",
    sets: "3–4", reps: "8–12", rest: "90 sec",
    why: "Dips are often called the 'upper body squat'. Leaning forward emphasizes the lower chest/pec, while upright torso shifts load to the triceps. They allow a deep stretch at the bottom and full contraction at the top, making them excellent for lower chest development.",
    science: "Dips produce high lower pectoral and triceps activation. They also engage the anterior delt as a stabilizer. Bodyweight dips are highly scalable via assistance bands or added weight.",
    cues: ["Lean torso slightly forward (15–30°) for chest emphasis.", "Lower yourself until upper arms are parallel to the floor.", "Feel the stretch across your chest at the bottom.", "Press up strongly and squeeze your pecs at the top.", "Don't shrug — keep shoulders packed down."],
    mistakes: ["Going too deep before building shoulder mobility", "Staying too upright (becomes a tricep exercise)"],
    progressions: ["Bench Dip → Assisted Dip → Bodyweight Dip → Weighted Dip"],
  },
  {
    id: "pushup",
    name: "Push-Up",
    group: "chest", secondary: ["triceps","shoulders","core"],
    difficulty: "Beginner", equipment: "None", type: "Compound",
    sets: "3–4", reps: "10–20", rest: "60 sec",
    why: "The push-up is the foundational horizontal push. It requires no equipment and trains the chest, triceps, anterior deltoid, and crucially — engages the core as a stabilizer. It's the ideal starting point before progressing to barbell work.",
    science: "Push-ups produce similar chest and tricep activation to the bench press at comparable relative intensities (Calatayud et al., 2015). They have the added benefit of full scapular protraction and core bracing demand.",
    cues: ["Hands just wider than shoulder-width, fingers forward.", "Body forms a rigid straight line — squeeze glutes and brace core.", "Lower until chest nearly touches the floor.", "Press back up explosively.", "Don't let hips sag or pike."],
    mistakes: ["Hips sagging (core not braced)", "Elbows flaring out wide (45° is ideal)", "Partial range of motion"],
    progressions: ["Wall Push-up → Incline Push-up → Full Push-up → Deficit Push-up → Weighted Push-up"],
  },

  // ── BACK ───────────────────────────────────────────────────────────────────
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    group: "back", secondary: ["glutes","legs","core","forearms"],
    difficulty: "Intermediate", equipment: "Barbell", type: "Compound",
    sets: "3–5", reps: "3–6", rest: "3–5 min",
    why: "The deadlift is arguably the most complete strength exercise in existence. It trains every posterior chain muscle simultaneously — erectors, traps, lats, glutes, hamstrings, and forearms. It builds real-world functional strength and triggers the greatest anabolic hormonal response of any lift.",
    science: "Deadlifts produce extremely high mechanical tension across the entire posterior chain. They trigger the greatest acute anabolic hormonal response of any exercise (Shaner et al., 2014).",
    cues: ["Bar over mid-foot, feet hip-width, grip just outside shins.", "Hinge at hips — push hips back, don't squat down to bar.", "Big breath, brace core hard ('prepare for a punch').", "Pull the slack out before driving — push the floor away.", "Keep bar dragging up shins. Lock out hips and squeeze glutes at top.", "Hinge back down — don't squat the descent."],
    mistakes: ["Rounding the lower back", "Jerking the bar off the floor", "Bar drifting away from body"],
    progressions: ["Romanian Deadlift → Trap Bar Deadlift → Conventional Deadlift"],
  },
  {
    id: "pullup",
    name: "Pull-Up / Lat Pulldown",
    group: "back", secondary: ["biceps"],
    difficulty: "Intermediate", equipment: "Pull-up Bar or Cable Machine", type: "Compound",
    sets: "3–4", reps: "6–12", rest: "90 sec",
    why: "Pull-ups are the squat of the upper body — they build wide, thick lats creating the V-taper. The lat pulldown is a perfect machine substitute that builds toward the same goal.",
    science: "Vertical pulling maximizes lat activation. The lat's primary function is shoulder extension and adduction. Strong lats improve posture and protect the shoulder joint.",
    cues: ["Grip slightly wider than shoulder-width, palms away.", "Hang with arms fully extended.", "Initiate by depressing shoulder blades (pulling shoulders away from ears).", "Drive elbows toward hips — not just bending arms.", "Chin clears the bar. Lower with control — 3 seconds down."],
    mistakes: ["Using only arm strength", "Partial range of motion", "Kipping without base strength"],
    progressions: ["Lat Pulldown → Assisted Pull-up → Full Pull-up → Weighted Pull-up"],
  },
  {
    id: "barbell_row",
    name: "Barbell Bent-Over Row",
    group: "back", secondary: ["biceps","core"],
    difficulty: "Intermediate", equipment: "Barbell", type: "Compound",
    sets: "3–4", reps: "6–10", rest: "2 min",
    why: "While pull-ups build lat width, rows build mid-back (rhomboids, traps, rear delts) thickness. Together, vertical and horizontal pulls create a complete back. Allows heavy loading for high mechanical tension.",
    science: "Horizontal rowing produces superior activation of rhomboids and mid-trapezius vs vertical pulls (Andersen et al., 2014). Mid-back strength is critical for postural health.",
    cues: ["Hinge at hips until torso is ~45° from horizontal.", "Brace core like taking a punch.", "Row bar to lower chest/upper abdomen.", "Pull elbows back and squeeze shoulder blades together at top.", "Lower with control."],
    mistakes: ["Standing too upright (becomes a shrug)", "Using momentum/jerking the weight", "Not contracting shoulder blades"],
    progressions: ["Dumbbell Row → Cable Row → Barbell Row"],
  },
  {
    id: "db_row",
    name: "Single-Arm Dumbbell Row",
    group: "back", secondary: ["biceps"],
    difficulty: "Beginner", equipment: "Dumbbell + Bench", type: "Compound",
    sets: "3–4", reps: "10–12 per side", rest: "60 sec",
    why: "The single-arm row removes the bilateral limitation of barbell rows — you can row a dumbbell further than a barbell (greater ROM). The braced position also removes the core fatigue factor, letting you focus entirely on back contraction.",
    science: "Unilateral training corrects muscle imbalances between left and right sides. The greater ROM allows loading the lat through a more complete range.",
    cues: ["Place one knee and hand on a bench. Torso parallel to the floor.", "Row the dumbbell to your hip/lower ribs — not to your shoulder.", "Think 'elbow to pocket' — drive the elbow back and down.", "Squeeze and hold at the top for 1 second.", "Slowly lower until arm is fully extended — don't rush the stretch."],
    mistakes: ["Rowing to the shoulder (becomes a rear delt exercise)", "Rotating the torso (use the back, not momentum)", "Not fully extending at the bottom"],
    progressions: ["Cable Row → DB Row → Barbell Row"],
  },
  {
    id: "facepull",
    name: "Face Pull",
    group: "shoulders", secondary: ["back"],
    difficulty: "Beginner", equipment: "Cable Machine", type: "Isolation",
    sets: "3–4", reps: "15–20", rest: "60 sec",
    why: "Face pulls are the most important shoulder health exercise almost nobody does. They directly target the rear deltoids and external rotators (infraspinatus, teres minor) — muscles that are always weak in people who do a lot of pressing. Imbalanced pressing without rear delt work is the #1 cause of shoulder impingement.",
    science: "The rear deltoid and external rotators are chronically undertrained in most programs. Strengthening them restores the shoulder's force couple balance and prevents subacromial impingement (Reinold et al., 2009).",
    cues: ["Cable at face height (or slightly above). Use a rope attachment.", "Pull the rope toward your face, spreading it apart as it approaches.", "Elbows should finish ABOVE shoulder height at full contraction.", "External rotate — think 'double bicep pose' at the end.", "Return slowly."],
    mistakes: ["Elbows too low (becomes a row, not a face pull)", "Using too much weight (ruins the form)", "Not externally rotating at the end"],
    progressions: ["Band Pull-Apart → Face Pull → Rear Delt Fly"],
  },
  {
    id: "cable_row",
    name: "Seated Cable Row",
    group: "back", secondary: ["biceps"],
    difficulty: "Beginner", equipment: "Cable Machine", type: "Compound",
    sets: "3–4", reps: "10–12", rest: "75 sec",
    why: "The cable row provides constant tension throughout the movement (unlike free weights which have variable resistance). The seated position removes lower back involvement, making it excellent for learning the rowing motor pattern and isolating mid-back muscles.",
    science: "Constant tension through cable rowing produces excellent time-under-tension for the rhomboids, middle trapezius, and lats. The stable seat allows higher rep ranges for metabolic hypertrophy.",
    cues: ["Sit upright with a slight forward lean at the start (stretched position).", "Drive elbows behind your torso — row to your lower chest.", "Squeeze your shoulder blades together at the end.", "Lean slightly forward on the return to maximize stretch.", "Don't jerk or use lower back momentum."],
    mistakes: ["Excessive torso sway", "Not achieving full scapular retraction", "Shrugging shoulders"],
    progressions: ["Machine Row → Cable Row → Barbell Row"],
  },

  // ── SHOULDERS ──────────────────────────────────────────────────────────────
  {
    id: "ohp",
    name: "Overhead Press (OHP)",
    group: "shoulders", secondary: ["triceps","core"],
    difficulty: "Intermediate", equipment: "Barbell or Dumbbells", type: "Compound",
    sets: "3–5", reps: "5–8", rest: "2–3 min",
    why: "The overhead press is the primary shoulder compound. It targets all three deltoid heads and the upper traps, while heavily engaging triceps and demanding core stability. It's a fundamental human movement pattern required in daily life and sports.",
    science: "Pressing overhead recruits anterior and medial deltoids maximally. Strong shoulders are essential for joint stability and protective against rotator cuff injuries when trained properly.",
    cues: ["Grip just outside shoulder-width. Bar on front of shoulders.", "Big breath and brace core. Press the bar STRAIGHT up.", "At the top, shrug traps slightly to press fully overhead.", "Lower to collarbone with control.", "Don't hyperextend lower back — that signals the weight is too heavy."],
    mistakes: ["Excessive lower back arch", "Pressing in front of the body rather than over it", "Flaring elbows excessively"],
    progressions: ["DB Lateral Raises → DB OHP → Barbell OHP"],
  },
  {
    id: "lateral_raise",
    name: "Lateral Raise",
    group: "shoulders", secondary: [],
    difficulty: "Beginner", equipment: "Dumbbells or Cables", type: "Isolation",
    sets: "3–4", reps: "12–20", rest: "60 sec",
    why: "The medial deltoid creates shoulder width and the capped look. It is barely activated during pressing (which favors the front delt). Lateral raises are the ONLY exercise that specifically targets this head. Non-negotiable for wider shoulders.",
    science: "EMG research shows the medial deltoid reaches peak activation at 30–90° of arm abduction, perfectly matching the lateral raise. High volume (15–30 reps) works well for deltoids.",
    cues: ["Start with dumbbells at sides, slight elbow bend.", "Raise arms to shoulder height — lead with elbows, not hands.", "At top, imagine pouring water from a jug (pinky slightly higher).", "Lower slowly — the eccentric is where growth happens.", "Don't shrug."],
    mistakes: ["Swinging with momentum", "Raising above ear height (rotator cuff stress)", "Going too heavy — these should be controlled"],
    progressions: ["Cable Lateral Raise → DB Lateral Raise → Heavy Cable Lateral Raise"],
  },
  {
    id: "arnold_press",
    name: "Arnold Press",
    group: "shoulders", secondary: ["triceps"],
    difficulty: "Intermediate", equipment: "Dumbbells", type: "Compound",
    sets: "3", reps: "10–12", rest: "75 sec",
    why: "Created by Arnold Schwarzenegger, this variation adds a rotation from a palms-in start to a palms-out finish. This rotation trains all three deltoid heads through a greater range of motion than a standard dumbbell press, with extra front delt emphasis.",
    science: "The rotational component increases anterior deltoid time-under-tension and scapular mobility compared to standard presses. The pronation-supination arc recruits multiple portions of the deltoid sequentially.",
    cues: ["Start with dumbbells at shoulder height, palms facing you.", "As you press up, rotate palms outward so they face forward at the top.", "Press to full extension overhead.", "Reverse the rotation as you lower.", "Keep core braced throughout."],
    mistakes: ["Rushing the rotation (the rotation IS the exercise)", "Going too heavy (lose the rotational benefit)", "Flaring elbows at the bottom start position"],
    progressions: ["DB Shoulder Press → Arnold Press"],
  },

  // ── BICEPS ─────────────────────────────────────────────────────────────────
  {
    id: "barbell_curl",
    name: "Barbell Curl",
    group: "biceps", secondary: ["forearms"],
    difficulty: "Beginner", equipment: "Barbell or EZ-Bar", type: "Isolation",
    sets: "3–4", reps: "8–12", rest: "60–90 sec",
    why: "The most direct bicep exercise. The biceps perform elbow flexion and forearm supination. A barbell allows maximum loading. The EZ-bar reduces wrist strain. Bigger biceps contribute to arm circumference and activate as stabilizers in all rowing movements.",
    science: "The long head of the bicep creates the 'peak'. Keeping elbows slightly forward emphasizes the long head. Incline curls (extended shoulder) stretch the long head maximally for enhanced growth.",
    cues: ["Stand tall with elbows pinned to sides.", "Curl with a supinated grip (palms up).", "Squeeze hard at the top.", "Lower slowly to full extension — get the full stretch."],
    mistakes: ["Swinging torso / using momentum", "Not fully extending at the bottom", "Letting elbows drift forward as weight goes up"],
    progressions: ["Hammer Curl → Barbell Curl → Incline DB Curl"],
  },
  {
    id: "hammer_curl",
    name: "Hammer Curl",
    group: "biceps", secondary: ["forearms"],
    difficulty: "Beginner", equipment: "Dumbbells", type: "Isolation",
    sets: "3", reps: "10–12", rest: "60 sec",
    why: "The neutral grip (thumbs up) shifts emphasis to the brachialis — a muscle that lies UNDER the bicep and pushes it up when developed, creating more arm size than working the bicep alone. Also heavily works the brachioradialis, building forearm thickness.",
    science: "The brachialis is the strongest elbow flexor and responds best to neutral-grip curling. Its development pushes the bicep peak higher, creating a larger overall arm appearance.",
    cues: ["Neutral grip — thumbs pointing up, like holding a hammer.", "Elbows pinned to sides.", "Curl up without supinating (don't rotate the wrist).", "Squeeze at the top. Lower slowly."],
    mistakes: ["Supinating the wrist (defeats the purpose)", "Swinging for momentum"],
    progressions: ["Hammer Curl → Incline Hammer Curl → Cross-Body Hammer Curl"],
  },
  {
    id: "incline_curl",
    name: "Incline Dumbbell Curl",
    group: "biceps", secondary: [],
    difficulty: "Beginner", equipment: "Dumbbells + Incline Bench", type: "Isolation",
    sets: "3", reps: "10–12", rest: "60 sec",
    why: "The incline position (45° recline) extends the shoulder behind the torso, placing the long head of the bicep in a pre-stretched position. Training in this stretched state produces greater hypertrophy than curls at a neutral shoulder angle — one of the best single exercises for bicep peak development.",
    science: "Research on 'stretch-mediated hypertrophy' (Pedrosa et al., 2022) shows muscles trained at longer lengths grow more than those trained only in shortened positions. The incline curl is the textbook example of this principle applied to biceps.",
    cues: ["Recline bench to 45–60°. Sit back and let arms hang freely.", "Curl WITHOUT letting your elbow drift forward — shoulder stays pinned.", "Supinate (rotate palm up) through the curl.", "Squeeze hard at the top. Lower very slowly to full extension.", "Resist the urge to swing — there's nowhere to cheat here."],
    mistakes: ["Elbow drifting forward (loses the stretch benefit)", "Not lowering to full extension"],
    progressions: ["Barbell Curl → Incline DB Curl"],
  },

  // ── TRICEPS ────────────────────────────────────────────────────────────────
  {
    id: "tricep_pushdown",
    name: "Cable Tricep Pushdown",
    group: "triceps", secondary: [],
    difficulty: "Beginner", equipment: "Cable Machine", type: "Isolation",
    sets: "3–4", reps: "10–15", rest: "60 sec",
    why: "The triceps make up ~2/3 of upper arm mass. The pushdown targets the lateral and medial heads primarily. The cable maintains constant tension unlike dumbbells. Strong triceps are critical for all pressing movements.",
    science: "The cable maintains tension at the top of extensions where dumbbells have none. For the long head, overhead tricep extensions produce superior hypertrophy (Maeo et al., 2021) because of stretch loading.",
    cues: ["Grip rope/bar, elbows tucked at sides.", "Push down until arms fully extended. Spread rope apart at bottom.", "Squeeze triceps hard at full extension.", "Return slowly — don't let weight crash up."],
    mistakes: ["Flaring elbows out", "Not fully extending (partial reps)", "Leaning too far over"],
    progressions: ["Pushdown → Overhead Tricep Extension → Close-Grip Bench Press"],
  },
  {
    id: "overhead_tricep_ext",
    name: "Overhead Tricep Extension",
    group: "triceps", secondary: [],
    difficulty: "Beginner", equipment: "Dumbbell or Cable", type: "Isolation",
    sets: "3", reps: "10–15", rest: "60 sec",
    why: "The overhead position is the ONLY way to fully stretch and train the long head of the triceps (the largest of the three heads). The long head crosses the shoulder joint, so you need overhead extension to put it in a stretched, loaded position — exactly what drives its growth.",
    science: "Maeo et al. (2021) demonstrated that overhead tricep extensions produce significantly greater long head hypertrophy than pushdowns. The long head is the biggest portion of the tricep — train it in its stretched position.",
    cues: ["Hold dumbbell overhead with both hands (or cable overhead).", "Keep elbows pointing straight forward — don't flare them.", "Lower the weight behind your head until you feel a deep stretch.", "Press back up to full extension overhead.", "Keep upper arms completely still — only forearms move."],
    mistakes: ["Flaring elbows out to the sides", "Moving upper arms (not isolating the tricep)", "Using too much weight"],
    progressions: ["Pushdown → Overhead Extension (DB) → Cable Overhead Extension"],
  },
  {
    id: "close_grip_bench",
    name: "Close-Grip Bench Press",
    group: "triceps", secondary: ["chest","shoulders"],
    difficulty: "Intermediate", equipment: "Barbell + Bench", type: "Compound",
    sets: "3–4", reps: "8–12", rest: "90 sec",
    why: "The close-grip bench press is the heaviest tricep exercise available. By narrowing the grip, the chest's mechanical advantage is reduced, transferring more of the load to the triceps. It allows significantly more loading than cable or dumbbell tricep work, driving strength and size.",
    science: "The close-grip bench press is a compound pressing movement that produces high tricep activation while still involving chest and shoulders — making it one of the most effective multi-joint tricep builders (Lehman, 2005).",
    cues: ["Grip the bar shoulder-width (not ultra-narrow — wrist stress).", "Keep elbows tucked close to your body throughout.", "Lower bar to lower chest/upper abdomen.", "Press powerfully back to full extension.", "Feel the triceps doing the work — not the chest."],
    mistakes: ["Grip too narrow (wrist strain)", "Elbows flaring out (shifts work to chest)", "Not achieving full lockout"],
    progressions: ["Tricep Pushdown → Close-Grip Bench → Weighted Dips"],
  },

  // ── LEGS ───────────────────────────────────────────────────────────────────
  {
    id: "squat",
    name: "Barbell Back Squat",
    group: "legs", secondary: ["glutes","core"],
    difficulty: "Intermediate", equipment: "Barbell + Squat Rack", type: "Compound",
    sets: "3–5", reps: "5–8", rest: "3 min",
    why: "The squat is 'the king of all exercises'. It trains every lower body muscle simultaneously — quads, hamstrings, glutes, and calves — while demanding significant core stability. Heavy loading triggers a powerful hormonal response. Squatting is fundamental to human function.",
    science: "Squats produce the highest total muscle recruitment of any lower body exercise (Contreras et al., 2016). They improve not just leg strength but bone density, hormonal profile, and athletic performance.",
    cues: ["Bar on upper traps (high bar) or rear delts (low bar). Brace before unracking.", "Feet shoulder-width, toes slightly out (15–30°).", "Break at hips AND knees simultaneously.", "Descend until thighs are parallel (or below — as mobility allows).", "Drive through heels and mid-foot. Think 'spread the floor'.", "Chest up, knees tracking over toes throughout."],
    mistakes: ["Knees caving inward (valgus collapse)", "Heels rising (ankle mobility issue)", "Butt wink at depth (go only as deep as form allows)"],
    progressions: ["Goblet Squat → Box Squat → Barbell Back Squat → Front Squat"],
  },
  {
    id: "romanian_deadlift",
    name: "Romanian Deadlift (RDL)",
    group: "legs", secondary: ["glutes","back"],
    difficulty: "Beginner", equipment: "Barbell or Dumbbells", type: "Compound",
    sets: "3–4", reps: "8–12", rest: "2 min",
    why: "The hamstrings are the most neglected leg muscle and #1 site of lower body injuries. The RDL loads the hamstrings in a deep stretched position — the most effective loading position for hypertrophy and injury prevention.",
    science: "Research shows muscles loaded at longer lengths produce superior hypertrophy (Pedrosa et al., 2022). The RDL is the gold standard evidence-based hamstring exercise.",
    cues: ["Stand with bar at hip height, feet hip-width.", "Push hips BACK (not down). Maintain a flat back.", "Lower bar along legs until strong hamstring stretch.", "Drive hips forward to return. Squeeze glutes at top.", "Movement comes from the HIP, not the lower back."],
    mistakes: ["Rounding the lower back", "Bending knees too much (becomes a squat)", "Going too deep and losing back position"],
    progressions: ["Good Morning → DB RDL → Barbell RDL → Single-Leg RDL"],
  },
  {
    id: "leg_press",
    name: "Leg Press",
    group: "legs", secondary: ["glutes"],
    difficulty: "Beginner", equipment: "Leg Press Machine", type: "Compound",
    sets: "3–4", reps: "10–15", rest: "2 min",
    why: "The leg press allows quad-dominant loading without spinal loading — ideal for beginners, those with back issues, or adding volume after squats. Foot placement changes emphasis: high = more glutes/hamstrings, low = more quads.",
    science: "The leg press produces comparable quad activation to squats with high stability. Excellent for high-rep metabolic work.",
    cues: ["Feet shoulder-width at mid-platform. Neutral spine, back flat.", "Lower until knees reach 90° (or slightly below).", "Press through entire foot.", "Don't lock out knees fully at top (maintains tension)."],
    mistakes: ["Knees caving inward", "Lower back lifting off pad", "Placing feet too low (knee stress)"],
    progressions: ["Leg Press → Goblet Squat → Barbell Squat"],
  },
  {
    id: "bulgarian_split_squat",
    name: "Bulgarian Split Squat",
    group: "legs", secondary: ["glutes","core"],
    difficulty: "Intermediate", equipment: "Dumbbells or Barbell + Bench", type: "Compound",
    sets: "3–4", reps: "8–10 per side", rest: "2 min",
    why: "The Bulgarian split squat (BSS) is arguably the best single-leg exercise in existence. It trains the quads through a deep range, stretches the hip flexors, corrects left-right imbalances, and forces core stability. Many elite coaches prefer it over back squats for hypertrophy.",
    science: "The BSS produces extremely high quad and glute activation — comparable to or exceeding back squats — with less spinal loading. Unilateral training forces each leg to produce force independently, correcting strength asymmetries.",
    cues: ["Rear foot elevated on a bench. Front foot stepped out far enough to maintain upright torso.", "Lower your back knee toward the floor.", "Keep front shin as vertical as possible.", "Drive through the front heel to rise.", "Keep torso upright — don't lean forward excessively."],
    mistakes: ["Front foot too close (excessive forward knee travel)", "Leaning too far forward", "Rushing the rep — control the descent"],
    progressions: ["Reverse Lunge → Split Squat → Bulgarian Split Squat → Weighted BSS"],
  },
  {
    id: "leg_curl",
    name: "Lying Leg Curl",
    group: "legs", secondary: [],
    difficulty: "Beginner", equipment: "Leg Curl Machine", type: "Isolation",
    sets: "3–4", reps: "10–15", rest: "75 sec",
    why: "The lying leg curl isolates the hamstrings in the knee flexion function (the other function, hip extension, is trained by RDLs and deadlifts). Together, hip extension and knee flexion hamstring work trains the full hamstring function and maximizes development.",
    science: "The hamstrings have two functions: hip extension and knee flexion. A complete hamstring program includes both. Lying leg curls add meaningful knee-flexion volume to complement hip-hinge movements.",
    cues: ["Lie face down. Position the pad just above your heels.", "Curl heels toward glutes — full range.", "Pause and squeeze at the top.", "Lower slowly — 3 count down.", "Don't let your hips rise off the pad."],
    mistakes: ["Hips lifting (lower back compensation)", "Not achieving full range at the top", "Letting the weight crash down"],
    progressions: ["Nordic Curl (eccentric) → Lying Leg Curl → Seated Leg Curl"],
  },
  {
    id: "leg_extension",
    name: "Leg Extension",
    group: "legs", secondary: [],
    difficulty: "Beginner", equipment: "Leg Extension Machine", type: "Isolation",
    sets: "3", reps: "12–15", rest: "60 sec",
    why: "The leg extension isolates the quadriceps (specifically the rectus femoris) in pure knee extension. While squats train the quads as part of a compound movement, leg extensions provide targeted isolation work and allow training the quad at long muscle lengths with the hip in a flexed position.",
    science: "The rectus femoris (quad head) is biarticular — it crosses the hip and knee. The seated position creates hip flexion which allows the distal quad to be loaded at a longer length. Recent research shows leg extensions can be a valuable addition to squat-based quad training.",
    cues: ["Sit upright with back against the pad.", "Position the pad just above the ankle (not on the foot).", "Extend both legs to near lockout — squeeze the quads hard.", "Lower slowly under control.", "Avoid swinging or jerking."],
    mistakes: ["Using momentum (swinging)", "Not fully contracting at the top"],
    progressions: ["Leg Extension → Sissy Squat → Front Squat"],
  },
  {
    id: "calf_raise",
    name: "Standing Calf Raise",
    group: "calves", secondary: [],
    difficulty: "Beginner", equipment: "Machine or Step", type: "Isolation",
    sets: "4", reps: "15–20", rest: "45 sec",
    why: "The calves (gastrocnemius and soleus) are notoriously stubborn muscles that require high volume and full range of motion to grow. Standing raises target the gastrocnemius (the outer, visible calf muscle). Seated raises target the soleus (deeper, adds thickness under the gastrocnemius).",
    science: "Calves have a high proportion of slow-twitch muscle fibers, responding best to higher rep ranges and controlled movements. Full stretch at the bottom is critical — bouncing off the bottom eliminates the stretch stimulus.",
    cues: ["Stand on a step or plate, heels hanging off the edge.", "Lower heels as far as possible (full stretch).", "Rise up onto the balls of your feet as high as possible.", "Hold the top for 1 second — really squeeze.", "Lower slowly — 2 to 3 counts down."],
    mistakes: ["Short range of motion (bouncing off the bottom)", "Going too fast (loses the tension)", "Not fully plantar-flexing at the top"],
    progressions: ["Seated Calf Raise → Standing Calf Raise → Single-Leg Calf Raise"],
  },

  // ── CORE ───────────────────────────────────────────────────────────────────
  {
    id: "plank",
    name: "Plank",
    group: "core", secondary: ["shoulders"],
    difficulty: "Beginner", equipment: "None", type: "Isometric",
    sets: "3", reps: "30–60 sec", rest: "45 sec",
    why: "The plank builds anti-extension core stability — resisting the spine from extending. This is the primary function of the abs in real life and in lifting. A strong plank transfers directly to better bracing in squats, deadlifts, and overhead presses.",
    science: "McGill (2007) advocates anti-extension exercises over spinal flexion (crunches) for building functional core strength without disc stress. The rectus abdominis and transverse abdominis are highly activated during the plank.",
    cues: ["Forearms on the floor, elbows under shoulders.", "Body forms a straight line head to heels.", "Squeeze glutes. Pull navel toward spine. Squeeze everything.", "Don't let hips sag or pike.", "Breathe — in through nose, out through mouth."],
    mistakes: ["Hips sagging (most common)", "Holding breath", "Head dropping down"],
    progressions: ["Wall Plank → Knee Plank → Full Plank → RKC Plank → Weighted Plank"],
  },
  {
    id: "dead_bug",
    name: "Dead Bug",
    group: "core", secondary: [],
    difficulty: "Beginner", equipment: "None", type: "Anti-Extension",
    sets: "3", reps: "8–10 per side", rest: "45 sec",
    why: "The dead bug teaches the nervous system to maintain neutral spine while moving the limbs — exactly what happens during every compound lift. It's one of the best spine-protective core exercises available.",
    science: "Maximizes transverse abdominis and lumbar multifidus activation — the deep stabilizers that protect the spine. Stuart McGill's research recommends this pattern for building a 'spine-sparing' core.",
    cues: ["Lie on back, arms up, knees at 90° in air.", "Press lower back firmly into the floor — hold throughout.", "Slowly lower one arm and opposite leg toward the floor.", "Exhale as you lower. Return slowly and repeat other side."],
    mistakes: ["Lower back lifting off floor", "Moving too fast"],
    progressions: ["Dead Bug → Pallof Press → Ab Wheel Rollout"],
  },
  {
    id: "ab_wheel",
    name: "Ab Wheel Rollout",
    group: "core", secondary: ["shoulders","back"],
    difficulty: "Advanced", equipment: "Ab Wheel", type: "Anti-Extension",
    sets: "3", reps: "6–10", rest: "60 sec",
    why: "The ab wheel rollout is one of the most demanding anti-extension core exercises. It creates an incredibly long lever arm that forces the abs to resist extreme spinal extension under load. Nothing builds functional ab strength faster.",
    science: "The rollout produces extremely high rectus abdominis and oblique activation — far greater than crunches or sit-ups (Escamilla et al., 2010). The anti-extension demand is highly transferable to heavy compound lifting.",
    cues: ["Start from knees (or feet if advanced).", "Brace core extremely hard — posterior pelvic tilt.", "Roll forward slowly, only as far as you can maintain a flat back.", "Pull back with abs — not by just bending at the hips.", "Stop if your lower back dips."],
    mistakes: ["Rolling out beyond your current strength (lower back dips)", "Using hip flexors to pull back instead of abs"],
    progressions: ["Dead Bug → Plank → Knee Rollout → Full Rollout"],
  },
  {
    id: "pallof_press",
    name: "Pallof Press",
    group: "core", secondary: [],
    difficulty: "Beginner", equipment: "Cable Machine or Band", type: "Anti-Rotation",
    sets: "3", reps: "10–12 per side", rest: "45 sec",
    why: "The Pallof press trains anti-rotation — resisting the torso from rotating under load. This is one of the most functional core movements because almost every athletic and daily movement involves resisting or producing rotation. It directly improves performance in every sport and protects the spine.",
    science: "Anti-rotation training targets the obliques and deep core stabilizers more effectively than many rotation exercises. The isometric resistance to rotation improves lumbar stability (Kibler et al., 2006).",
    cues: ["Stand sideways to a cable machine. Hold cable at chest height.", "Press the cable away from your chest to full arm extension.", "Resist the cable pulling you toward the machine — don't rotate.", "Hold 2 seconds at full extension. Return to chest. Repeat.", "Stand tall — don't lean away from the cable."],
    mistakes: ["Leaning away to compensate", "Rotating at extension (defeats purpose)"],
    progressions: ["Pallof Press (standing) → Tall Kneeling → Single-Leg Pallof Press"],
  },

  // ── GLUTES ─────────────────────────────────────────────────────────────────
  {
    id: "hip_thrust",
    name: "Barbell Hip Thrust",
    group: "glutes", secondary: ["legs"],
    difficulty: "Beginner", equipment: "Barbell + Bench", type: "Compound",
    sets: "3–4", reps: "10–15", rest: "90 sec",
    why: "The hip thrust is the most effective glute exercise in existence. It places the glute max under maximum tension in the fully extended position. EMG studies show it produces 2× the glute activation of squats.",
    science: "Contreras et al. (2015) demonstrated that hip thrusts produce significantly greater gluteus maximus EMG activation than squats, deadlifts, and lunges. Strong glutes support lower back, improve posture, and are the primary power producer in running and jumping.",
    cues: ["Sit against bench, barbell over hips (use a pad). Upper back on bench.", "Feet flat, shoulder-width. Drive through heels.", "Push hips up until torso and thighs form a straight line.", "Squeeze glutes HARD at top. Hold 1 second.", "Lower under control."],
    mistakes: ["Not fully extending the hip", "Pushing through toes instead of heels", "Lower back extending instead of hips"],
    progressions: ["Glute Bridge (bodyweight) → Hip Thrust (bodyweight) → Banded Hip Thrust → Barbell Hip Thrust"],
  },
  {
    id: "goblet_squat",
    name: "Goblet Squat",
    group: "legs", secondary: ["glutes","core"],
    difficulty: "Beginner", equipment: "Dumbbell or Kettlebell", type: "Compound",
    sets: "3", reps: "12–15", rest: "75 sec",
    why: "The goblet squat is the best exercise for learning squat mechanics. Holding the weight at the chest acts as a counterbalance, making it easier to maintain an upright torso and sit into a deep squat position. It's the perfect starting point before adding a barbell.",
    science: "The anterior load of the goblet squat naturally encourages an upright torso posture, reducing the forward lean common in beginners. It also promotes ankle mobility and hip flexor flexibility.",
    cues: ["Hold a dumbbell or kettlebell at chest height (goblet position).", "Feet shoulder-width, toes out slightly.", "Squat deep — 'between your legs', elbows inside your knees.", "Keep chest up and torso as vertical as possible.", "Drive through heels to stand."],
    mistakes: ["Heels rising (work on ankle mobility)", "Torso collapsing forward", "Not squatting deep enough"],
    progressions: ["Goblet Squat → Front Squat → Back Squat"],
  },
];

// ─── METHODOLOGIES ────────────────────────────────────────────────────────────

const METHODOLOGIES = [
  {
    id: "progressive_overload",
    name: "Progressive Overload",
    icon: "📈",
    color: "#5ce08f",
    tagline: "The #1 fundamental principle of all training",
    overview: "Progressive overload is the systematic increase of training stress over time. Your body adapts to whatever stress you place on it — if you don't increase the demand, adaptation stops. This is the foundational mechanic behind all strength and muscle gains.",
    howItWorks: "Every session, you must do slightly more than last session. This can mean: adding weight to the bar, doing more reps at the same weight, adding a set, reducing rest time, or improving technique (which increases effective force production). For beginners, add 5 lbs to upper body and 10 lbs to lower body each session — this is called 'linear progression' and works for 3–6 months.",
    keyPrinciples: [
      "Track every workout — you can't progress what you don't measure",
      "Increase load only when you hit the top of your rep target for ALL sets",
      "Small consistent increases beat big occasional ones",
      "Deload every 4–8 weeks to allow fatigue to dissipate",
      "When linear progression stalls, switch to weekly (intermediate) or monthly (advanced) progression",
    ],
    whoFor: "Everyone. This is not a program — it's the underlying principle ALL programs are built on.",
  },
  {
    id: "push_pull_legs",
    name: "Push / Pull / Legs (PPL)",
    icon: "🔁",
    color: "#5c8fe0",
    tagline: "The most popular hypertrophy split",
    overview: "PPL groups exercises by movement pattern: Push days train chest, shoulders, and triceps. Pull days train back and biceps. Leg days train the entire lower body. Each session trains muscles that work synergistically together.",
    howItWorks: "Run 3 days/week (once through, each muscle group 1×/week — fine for beginners) or 6 days/week (twice through, each muscle group 2×/week — optimal for intermediates). The 6-day version is one of the highest volume, highest frequency configurations available.",
    keyPrinciples: [
      "Compound movements first (bench, rows, squats, deadlifts) — heaviest and most demanding",
      "Isolation work after compounds (curls, raises, extensions)",
      "2–3 working sets for each major compound, 2–3 for each isolation",
      "Progressive overload applies to every exercise, every week",
      "6-day version requires excellent recovery (sleep, nutrition, stress management)",
    ],
    whoFor: "Intermediate trainees with 6+ months of consistent training. Beginners should use full-body first.",
  },
  {
    id: "531",
    name: "5/3/1 (Jim Wendler)",
    icon: "💯",
    color: "#e0a85c",
    tagline: "The gold standard intermediate strength program",
    overview: "Created by powerlifter Jim Wendler, 5/3/1 is built around four core lifts: Squat, Deadlift, Bench Press, and Overhead Press. It uses a percentage-based wave loading system with monthly progression, and emphasizes training for the long term — not getting strong fast, but getting strong forever.",
    howItWorks: "Calculate your Training Max (TM) = 90% of your 1 Rep Max. Each 4-week cycle has 3 working weeks followed by a deload week. Week 1: 3 sets of 5 reps (65%, 75%, 85% TM). Week 2: 3 sets of 3 reps (70%, 80%, 90% TM). Week 3: 5/3/1 week (75%, 85%, 95% TM). The final set of each workout is an 'AMRAP' (as many reps as possible) — this is where you push. After each cycle, add 5 lbs to upper body TM and 10 lbs to lower body TM.",
    keyPrinciples: [
      "START LIGHT — Wendler's most important instruction. Use 90% of your true max as your TM.",
      "The AMRAP set is the most important set — push hard but leave 1–2 reps in the tank",
      "Assistance work (BBB, First Set Last, etc.) is done after the main lifts",
      "Never miss a rep on the main lifts — if you do, your TM is too high",
      "The program is designed for years of use — trust the process",
      "The deload week is mandatory, not optional",
    ],
    whoFor: "Intermediate to advanced lifters who have stalled on linear progression. Requires knowing your approximate maxes.",
  },
  {
    id: "stronglifts",
    name: "StrongLifts 5×5",
    icon: "⚡",
    color: "#e05c5c",
    tagline: "The best beginner barbell program",
    overview: "StrongLifts 5×5 is the most popular beginner barbell program in the world, and for good reason. It focuses on just 5 compound lifts, trains 3 days per week, and has you adding weight every single session. The simplicity and built-in progression make it nearly foolproof for beginners.",
    howItWorks: "Train alternating Workout A and Workout B, 3× per week with rest days between. Workout A: Squat, Bench Press, Barbell Row. Workout B: Squat, Overhead Press, Deadlift. ALL exercises: 5 sets of 5 reps (except deadlift: 1×5). Add 5 lbs to upper body and 10 lbs to lower body each session. When you fail to complete 5×5, deload 10% and rebuild.",
    keyPrinciples: [
      "Squat every session — it's the program's cornerstone",
      "Start LIGHT (empty bar for beginners). Ego is the enemy here.",
      "Follow the progression exactly — no skipping weights",
      "Eat enough to recover — you can't build muscle in a deficit as a beginner",
      "Deload and reset when you stall — don't try to grind through failures",
      "Run it until linear progression completely stalls (~3–6 months)",
    ],
    whoFor: "Absolute beginners to barbell training. No prior experience required.",
  },
  {
    id: "upper_lower",
    name: "Upper / Lower Split",
    icon: "↕️",
    color: "#a85ce0",
    tagline: "Optimal balance of frequency and volume",
    overview: "The Upper/Lower split divides training into upper body days (chest, back, shoulders, arms) and lower body days (quads, hamstrings, glutes, calves). Training 4 days per week, each muscle group is trained twice per week — the research-backed optimal frequency for hypertrophy.",
    howItWorks: "4 days/week: Monday Upper, Tuesday Lower, Thursday Upper, Friday Lower. Typically one upper day emphasizes strength (lower reps, heavier) and one emphasizes hypertrophy (higher reps, more volume). Same pattern for lower body. This structure allows adequate volume per muscle while ensuring 48–72 hours of recovery.",
    keyPrinciples: [
      "Balance push and pull volume on upper days (1:1 ratio prevents shoulder imbalances)",
      "Strength-focused day: 3–6 reps, longer rest, progressive overload focus",
      "Hypertrophy day: 8–15 reps, more exercises, shorter rest",
      "Adjust volume gradually — start with less and add over weeks",
      "This split scales from beginner (low volume) to advanced (high volume) without changing the structure",
    ],
    whoFor: "Beginners who have completed 2–3 months of full-body training, and intermediates. Excellent all-around split.",
  },
  {
    id: "gzclp",
    name: "GZCLP (Tier System)",
    icon: "🔺",
    color: "#5ce0d4",
    tagline: "Structured tier-based beginner/intermediate program",
    overview: "Created by powerlifter Cody Lefever (GZCL), GZCLP organizes exercises into three tiers by importance and rep range. T1 (top priority): low-rep strength work on main lifts. T2 (secondary): moderate rep accessory compounds. T3 (tertiary): high-rep isolation work. This hierarchy ensures the most important lifts are trained freshest.",
    howItWorks: "T1 exercises (Squat, Bench, Deadlift, OHP): 5 sets × 3 reps, heavy and progressive. T2 exercises (Romanian Deadlift, DB Row, etc.): 3 sets × 10 reps. T3 exercises (isolation work): 3 sets × 15–25 reps. Run 4 days/week. Add weight to T1 each session, T2 every 1–2 weeks, T3 when you can do all reps easily.",
    keyPrinciples: [
      "T1 always done first — you need to be fresh for your heaviest work",
      "T1 failure protocol: when you fail to complete the reps, switch to 6×2, then 10×1 before deloading",
      "T2 and T3 work is supplemental — don't overdo it at the expense of T1 recovery",
      "The tier system can be applied to any split (full body, upper/lower, PPL)",
      "Highly customizable — any exercise can be plugged into the appropriate tier",
    ],
    whoFor: "Beginners ready to use a more structured approach, or intermediates wanting a framework to organize their programming.",
  },
  {
    id: "hypertrophy_specificity",
    name: "Hypertrophy-Specific Training (HST)",
    icon: "🔬",
    color: "#e07a5c",
    tagline: "Science-first approach to muscle building",
    overview: "HST (Bryan Haycock) is built directly on the physiological mechanisms of hypertrophy: mechanical tension, metabolic stress, and muscle damage. It uses high frequency (3×/week per muscle), progressive load, and strategic deconditioning (SD) periods to keep muscles responding to training stimulus.",
    howItWorks: "Train the whole body 3× per week. Each 8-week block progresses through rep ranges: 2 weeks at 15 reps, 2 weeks at 10 reps, 2 weeks at 5 reps, 2 weeks at negatives/loaded stretch. Loads increase every session based on calculated progression. After 8 weeks, take a 9–14 day 'strategic deconditioning' break to re-sensitize muscles.",
    keyPrinciples: [
      "High frequency is the foundation — each muscle is stimulated 3× per week",
      "Load must always be the maximum you can handle for the rep range — no leaving reps in the tank",
      "The Strategic Deconditioning period is not optional — it re-sensitizes muscles to mechanical load",
      "Compound movements dominate — isolation only where compounds can't reach the muscle",
      "The program is periodized from high reps (lighter) to low reps (heavier) within each cycle",
    ],
    whoFor: "Intermediate lifters who understand the principles of training and want a science-based approach to hypertrophy.",
  },
  {
    id: "conjugate",
    name: "Conjugate / Westside Method",
    icon: "⚔️",
    color: "#e0d45c",
    tagline: "Advanced powerlifting methodology",
    overview: "Developed by Louie Simmons at Westside Barbell, the conjugate method trains multiple physical qualities simultaneously throughout the training week — unlike linear programs that focus on one thing at a time. It uses Max Effort (ME) days for maximum strength and Dynamic Effort (DE) days for speed/power.",
    howItWorks: "4 days/week: ME Upper, ME Lower, DE Upper, DE Lower. Max Effort: Work up to a max set of 1–3 reps on a primary lift variation (box squat, floor press, etc.) — rotating exercises frequently to avoid accommodation. Dynamic Effort: 8–12 sets of 2–3 reps at 50–70% of max, performed with maximum speed/intent. Assistance work follows each main movement.",
    keyPrinciples: [
      "Max Effort raises absolute strength; Dynamic Effort trains rate of force development (speed-strength)",
      "Exercise rotation on ME days prevents accommodation — your body can't adapt to a stimulus if it changes",
      "DE work must be done with genuine maximal intent to contract — not just going through the motions",
      "Conjugate requires understanding your body and managing fatigue — not for beginners",
      "Bands and chains are often used to accommodate resistance curves",
      "Accessory work targeting weak points is critical to the system",
    ],
    whoFor: "Advanced lifters (2+ years), particularly those interested in powerlifting. Not appropriate for beginners.",
  },
];

// ─── ROUTINES ─────────────────────────────────────────────────────────────────

const ROUTINES = [
  // BEGINNER
  {
    id: "full_body_3",
    name: "Full Body 3×/Week",
    methodology: "progressive_overload",
    tag: "Best for Beginners",
    tagColor: "#5ce08f",
    level: "Beginner",
    frequency: "3 days/week",
    goal: "Overall strength & muscle",
    description: "Train the whole body every session. Beginners recover fast enough to benefit from hitting each muscle 3× per week. Maximizes the 'muscle protein synthesis signal' every workout.",
    science: "For beginners, training frequency matters more than volume. More frequent stimulation (3×/week per muscle) produces faster neural adaptations (Colquhoun et al., 2018). Full-body ensures no muscle groups fall behind.",
    days: [
      {
        name: "Day A",
        exercises: [
          { id: "squat", sets: 3, reps: "5", note: "Main lower body compound — add 10 lbs/session" },
          { id: "bench_press", sets: 3, reps: "5", note: "Main upper push — add 5 lbs/session" },
          { id: "barbell_row", sets: 3, reps: "5", note: "Main upper pull — matches bench volume" },
          { id: "plank", sets: 3, reps: "30 sec", note: "Core stability" },
        ]
      },
      {
        name: "Day B",
        exercises: [
          { id: "squat", sets: 3, reps: "5", note: "Progressive overload — keep adding weight" },
          { id: "ohp", sets: 3, reps: "5", note: "Vertical push — add 5 lbs/session" },
          { id: "deadlift", sets: 1, reps: "5", note: "Just 1 heavy work set — very taxing on the CNS" },
          { id: "dead_bug", sets: 3, reps: "8/side", note: "Core anti-extension" },
        ]
      }
    ]
  },
  {
    id: "stronglifts_5x5",
    name: "StrongLifts 5×5",
    methodology: "stronglifts",
    tag: "Classic Beginner",
    tagColor: "#e05c5c",
    level: "Beginner",
    frequency: "3 days/week (A/B alternating)",
    goal: "Strength foundation",
    description: "The most proven beginner barbell program. Alternate Workout A and B each session. Add weight every single session. Simple, brutal, and effective.",
    science: "Focuses on the most bang-for-buck compound movements trained at high frequency. Beginner neural adaptations allow rapid linear progression for 3–6 months before switching to an intermediate program.",
    days: [
      {
        name: "Workout A",
        exercises: [
          { id: "squat", sets: 5, reps: "5", note: "5×5 — add 10 lbs every session" },
          { id: "bench_press", sets: 5, reps: "5", note: "5×5 — add 5 lbs every session (alternate with OHP)" },
          { id: "barbell_row", sets: 5, reps: "5", note: "5×5 — add 5 lbs every session" },
        ]
      },
      {
        name: "Workout B",
        exercises: [
          { id: "squat", sets: 5, reps: "5", note: "5×5 — SAME weight as last squat session until progress, then add" },
          { id: "ohp", sets: 5, reps: "5", note: "5×5 — add 5 lbs every session (alternates with bench)" },
          { id: "deadlift", sets: 1, reps: "5", note: "1×5 only — add 10 lbs every session" },
        ]
      }
    ]
  },
  // INTERMEDIATE
  {
    id: "upper_lower_intermediate",
    name: "Upper / Lower Split",
    methodology: "upper_lower",
    tag: "Great for Intermediates",
    tagColor: "#a85ce0",
    level: "Intermediate",
    frequency: "4 days/week",
    goal: "Hypertrophy + Strength",
    description: "Split into upper and lower body days. Each muscle group trained twice per week with enough volume to drive consistent muscle growth.",
    science: "2× per week muscle frequency is the research-backed optimal for hypertrophy (Schoenfeld et al., 2016). Higher per-session volume than full-body while maintaining recovery.",
    days: [
      {
        name: "Upper A – Strength",
        exercises: [
          { id: "bench_press", sets: 4, reps: "4–6", note: "Heavy — progressive overload" },
          { id: "barbell_row", sets: 4, reps: "4–6", note: "Match bench volume" },
          { id: "ohp", sets: 3, reps: "5–7", note: "Overhead strength" },
          { id: "pullup", sets: 3, reps: "4–6", note: "Lat width — weighted if easy" },
          { id: "facepull", sets: 3, reps: "15", note: "Shoulder health — never skip" },
        ]
      },
      {
        name: "Lower A – Strength",
        exercises: [
          { id: "squat", sets: 4, reps: "4–6", note: "Quad dominant compound" },
          { id: "romanian_deadlift", sets: 3, reps: "6–8", note: "Hamstring focus" },
          { id: "hip_thrust", sets: 3, reps: "8–10", note: "Glute isolation" },
          { id: "plank", sets: 3, reps: "45 sec", note: "Core" },
        ]
      },
      {
        name: "Upper B – Hypertrophy",
        exercises: [
          { id: "incline_db_press", sets: 4, reps: "10–12", note: "Upper chest focus" },
          { id: "cable_row", sets: 4, reps: "10–12", note: "Mid-back thickness" },
          { id: "lateral_raise", sets: 4, reps: "15–20", note: "Shoulder width — always higher reps" },
          { id: "facepull", sets: 3, reps: "20", note: "Rear delt health" },
          { id: "barbell_curl", sets: 3, reps: "10–12", note: "Bicep isolation" },
          { id: "overhead_tricep_ext", sets: 3, reps: "12–15", note: "Long head tricep" },
        ]
      },
      {
        name: "Lower B – Hypertrophy",
        exercises: [
          { id: "leg_press", sets: 4, reps: "12–15", note: "Quad volume" },
          { id: "romanian_deadlift", sets: 4, reps: "10–12", note: "Hamstring volume" },
          { id: "hip_thrust", sets: 4, reps: "12–15", note: "Glute volume" },
          { id: "leg_curl", sets: 3, reps: "12–15", note: "Knee flexion hamstring work" },
          { id: "calf_raise", sets: 4, reps: "15–20", note: "Full ROM — squeeze at top" },
        ]
      }
    ]
  },
  {
    id: "ppl_6day",
    name: "Push / Pull / Legs (6-Day)",
    methodology: "push_pull_legs",
    tag: "Popular Hypertrophy",
    tagColor: "#5c8fe0",
    level: "Intermediate",
    frequency: "6 days/week",
    goal: "Hypertrophy",
    description: "Run Push/Pull/Legs twice per week. Each muscle group trained 2× with high volume per session. The gold standard hypertrophy split for intermediates.",
    science: "PPL run 6 days hits each muscle 2× per week with high volume — an excellent hypertrophy configuration. Synergistic muscles fatigue and recover together.",
    days: [
      {
        name: "Push (Mon/Thu)",
        exercises: [
          { id: "bench_press", sets: 4, reps: "6–8", note: "Primary chest compound" },
          { id: "incline_db_press", sets: 3, reps: "10–12", note: "Upper chest" },
          { id: "ohp", sets: 3, reps: "8–10", note: "Shoulder press" },
          { id: "lateral_raise", sets: 4, reps: "15–20", note: "Side delt width" },
          { id: "tricep_pushdown", sets: 3, reps: "12–15", note: "Tricep lateral/medial head" },
          { id: "overhead_tricep_ext", sets: 3, reps: "12–15", note: "Tricep long head" },
        ]
      },
      {
        name: "Pull (Tue/Fri)",
        exercises: [
          { id: "deadlift", sets: 3, reps: "4–5", note: "Heavy compound — only on first Pull day of week" },
          { id: "pullup", sets: 4, reps: "8–10", note: "Lat width — pulldown if needed" },
          { id: "barbell_row", sets: 4, reps: "8", note: "Back thickness" },
          { id: "facepull", sets: 4, reps: "15–20", note: "Rear delt and shoulder health" },
          { id: "barbell_curl", sets: 3, reps: "10–12", note: "Bicep compound curl" },
          { id: "hammer_curl", sets: 3, reps: "10–12", note: "Brachialis and forearm" },
        ]
      },
      {
        name: "Legs (Wed/Sat)",
        exercises: [
          { id: "squat", sets: 4, reps: "6–8", note: "Quad dominant compound" },
          { id: "romanian_deadlift", sets: 3, reps: "8–10", note: "Hamstring" },
          { id: "leg_press", sets: 3, reps: "12–15", note: "Quad volume" },
          { id: "hip_thrust", sets: 4, reps: "12", note: "Glute focus" },
          { id: "leg_curl", sets: 3, reps: "12–15", note: "Knee flexion" },
          { id: "calf_raise", sets: 4, reps: "15–20", note: "Full stretch and squeeze" },
        ]
      }
    ]
  },
  // 5/3/1 VARIANTS
  {
    id: "531_beginner",
    name: "5/3/1 for Beginners",
    methodology: "531",
    tag: "5/3/1 Method",
    tagColor: "#e0a85c",
    level: "Beginner-Intermediate",
    frequency: "3 days/week",
    goal: "Strength + Size",
    description: "Wendler's own beginner template. Trains all four main lifts 3× per week with built-in assistance work. Monthly weight progression — start very light and trust the process.",
    science: "5/3/1 uses percentage-based periodization with built-in fatigue management. The monthly progression is intentionally slow to allow sustainable long-term gains and minimize injury risk.",
    days: [
      {
        name: "Day 1",
        exercises: [
          { id: "squat", sets: 3, reps: "5/5/5+", note: "65%/75%/85% of Training Max. Final set is AMRAP — push it!" },
          { id: "bench_press", sets: 3, reps: "5/5/5+", note: "65%/75%/85% of TM. AMRAP on last set." },
          { id: "deadlift", sets: 3, reps: "5/5/5+", note: "Assistance: 5 sets × 10 reps at 50–60% TM" },
        ]
      },
      {
        name: "Day 2",
        exercises: [
          { id: "ohp", sets: 3, reps: "5/5/5+", note: "65%/75%/85% TM. AMRAP on last set." },
          { id: "deadlift", sets: 3, reps: "5/5/5+", note: "65%/75%/85% TM. AMRAP last set." },
          { id: "squat", sets: 3, reps: "5/5/5+", note: "Assistance work at 50% TM × 10 reps" },
        ]
      },
      {
        name: "Day 3",
        exercises: [
          { id: "bench_press", sets: 3, reps: "5/5/5+", note: "Same percentages as Day 1" },
          { id: "squat", sets: 3, reps: "5/5/5+", note: "Same percentages" },
          { id: "pullup", sets: 5, reps: "10", note: "Assistance — or lat pulldown" },
        ]
      }
    ]
  },
  {
    id: "531_bbb",
    name: "5/3/1 Boring But Big (BBB)",
    methodology: "531",
    tag: "5/3/1 — Size & Strength",
    tagColor: "#e0a85c",
    level: "Intermediate",
    frequency: "4 days/week",
    goal: "Strength + Hypertrophy",
    description: "The most popular 5/3/1 variant. After the main 5/3/1 sets, do 5 sets × 10 reps of the same (or complementary) lift at 50–60% of Training Max. Brutal volume that builds both size and strength.",
    science: "BBB adds significant hypertrophy volume to the strength-focused main work. The 5×10 'back-off' sets create metabolic stress and additional mechanical tension at a manageable load, allowing muscles to recover while still accumulating growth stimulus.",
    days: [
      {
        name: "Press Day (Mon)",
        exercises: [
          { id: "ohp", sets: 3, reps: "5/3/1", note: "Main work: Week 1=5s, Week 2=3s, Week 3=5/3/1. AMRAP last set." },
          { id: "bench_press", sets: 5, reps: "10", note: "BBB: 5×10 at 50% of your bench TM — this is heavy after OHP" },
          { id: "pullup", sets: 5, reps: "10", note: "Assistance pulling work" },
          { id: "lateral_raise", sets: 3, reps: "15", note: "Shoulder health/width" },
        ]
      },
      {
        name: "Deadlift Day (Tue)",
        exercises: [
          { id: "deadlift", sets: 3, reps: "5/3/1", note: "Main work. AMRAP on final set." },
          { id: "squat", sets: 5, reps: "10", note: "BBB: 5×10 at 50% of squat TM" },
          { id: "leg_curl", sets: 3, reps: "10–12", note: "Hamstring assistance" },
          { id: "plank", sets: 3, reps: "45 sec", note: "Core" },
        ]
      },
      {
        name: "Bench Day (Thu)",
        exercises: [
          { id: "bench_press", sets: 3, reps: "5/3/1", note: "Main work. AMRAP on final set." },
          { id: "ohp", sets: 5, reps: "10", note: "BBB: 5×10 at 50% of OHP TM" },
          { id: "cable_row", sets: 5, reps: "10", note: "Horizontal pull assistance" },
          { id: "facepull", sets: 3, reps: "20", note: "Shoulder health" },
        ]
      },
      {
        name: "Squat Day (Fri)",
        exercises: [
          { id: "squat", sets: 3, reps: "5/3/1", note: "Main work. AMRAP on final set." },
          { id: "deadlift", sets: 5, reps: "10", note: "BBB: 5×10 at 50% of deadlift TM — very demanding" },
          { id: "hip_thrust", sets: 3, reps: "12", note: "Glute assistance" },
          { id: "calf_raise", sets: 3, reps: "15", note: "Calf volume" },
        ]
      }
    ]
  },
  // ADVANCED
  {
    id: "gzclp",
    name: "GZCLP",
    methodology: "gzclp",
    tag: "Tier-Based System",
    tagColor: "#5ce0d4",
    level: "Beginner-Intermediate",
    frequency: "4 days/week",
    goal: "Strength + Hypertrophy",
    description: "Organizes exercises into T1 (heavy strength), T2 (moderate compounds), and T3 (isolation) tiers. T1 exercises are always done first, freshest. Higher tiers supplement the main work.",
    science: "The tier hierarchy ensures your most important lifts are performed when neuromuscular fatigue is lowest. Different rep ranges within a session allow concurrent training of strength and hypertrophy.",
    days: [
      {
        name: "Day 1 (Squat Focus)",
        exercises: [
          { id: "squat", sets: 5, reps: "3", note: "T1: Heavy. Add weight every session." },
          { id: "romanian_deadlift", sets: 3, reps: "10", note: "T2: Moderate. Add weight every 1–2 weeks." },
          { id: "leg_extension", sets: 3, reps: "15–25", note: "T3: Isolation. Add weight when you can do all reps." },
          { id: "leg_curl", sets: 3, reps: "15–25", note: "T3: Isolation." },
        ]
      },
      {
        name: "Day 2 (Bench Focus)",
        exercises: [
          { id: "bench_press", sets: 5, reps: "3", note: "T1: Heavy. Add weight every session." },
          { id: "incline_db_press", sets: 3, reps: "10", note: "T2: Upper chest volume." },
          { id: "cable_row", sets: 3, reps: "10", note: "T2: Back — balance the pressing." },
          { id: "tricep_pushdown", sets: 3, reps: "15–25", note: "T3: Tricep isolation." },
          { id: "barbell_curl", sets: 3, reps: "15–25", note: "T3: Bicep isolation." },
        ]
      },
      {
        name: "Day 3 (Deadlift Focus)",
        exercises: [
          { id: "deadlift", sets: 5, reps: "3", note: "T1: Heavy. Add weight every session." },
          { id: "bulgarian_split_squat", sets: 3, reps: "10/side", note: "T2: Unilateral leg work." },
          { id: "hip_thrust", sets: 3, reps: "10", note: "T2: Glute isolation." },
          { id: "plank", sets: 3, reps: "30–60 sec", note: "T3: Core stability." },
          { id: "pallof_press", sets: 3, reps: "10/side", note: "T3: Anti-rotation core." },
        ]
      },
      {
        name: "Day 4 (OHP Focus)",
        exercises: [
          { id: "ohp", sets: 5, reps: "3", note: "T1: Heavy. Add weight every session." },
          { id: "pullup", sets: 3, reps: "10", note: "T2: Vertical pull — weighted if needed." },
          { id: "db_row", sets: 3, reps: "10/side", note: "T2: Horizontal pull." },
          { id: "lateral_raise", sets: 3, reps: "15–25", note: "T3: Side delt isolation." },
          { id: "facepull", sets: 3, reps: "15–25", note: "T3: Rear delt and shoulder health." },
        ]
      }
    ]
  },
  {
    id: "powerbuilding",
    name: "Powerbuilding (Strength + Size)",
    methodology: "upper_lower",
    tag: "Best of Both Worlds",
    tagColor: "#e07a5c",
    level: "Intermediate",
    frequency: "4 days/week",
    goal: "Strength + Hypertrophy",
    description: "Combines powerlifting (heavy compound strength) and bodybuilding (hypertrophy isolation work) in a single program. Heavy main lifts for strength, accessory work for size. The most complete intermediate program structure.",
    science: "Research shows strength and hypertrophy are not mutually exclusive — they can be trained concurrently. Low-rep compound work (1–6 reps) maximizes mechanical tension and neural adaptations; higher-rep accessory work adds metabolic stress and additional volume for size.",
    days: [
      {
        name: "Upper A – Heavy",
        exercises: [
          { id: "bench_press", sets: 5, reps: "3–5", note: "Main strength work — build to heavy set" },
          { id: "barbell_row", sets: 5, reps: "3–5", note: "Match bench intensity" },
          { id: "ohp", sets: 3, reps: "6–8", note: "Secondary press" },
          { id: "pullup", sets: 3, reps: "6–8", note: "Secondary pull" },
          { id: "close_grip_bench", sets: 3, reps: "8–10", note: "Tricep strength" },
          { id: "barbell_curl", sets: 3, reps: "8–10", note: "Bicep strength" },
        ]
      },
      {
        name: "Lower A – Heavy",
        exercises: [
          { id: "squat", sets: 5, reps: "3–5", note: "Main strength work" },
          { id: "deadlift", sets: 3, reps: "3–5", note: "Secondary strength — moderate volume" },
          { id: "bulgarian_split_squat", sets: 3, reps: "8–10/side", note: "Unilateral leg strength" },
          { id: "hip_thrust", sets: 3, reps: "8–10", note: "Glute strength" },
          { id: "plank", sets: 3, reps: "45 sec", note: "Core" },
        ]
      },
      {
        name: "Upper B – Volume",
        exercises: [
          { id: "incline_db_press", sets: 4, reps: "10–12", note: "Upper chest hypertrophy" },
          { id: "cable_row", sets: 4, reps: "10–12", note: "Mid-back volume" },
          { id: "dips", sets: 3, reps: "10–15", note: "Lower chest/tricep" },
          { id: "facepull", sets: 4, reps: "15–20", note: "Rear delt and shoulder health" },
          { id: "lateral_raise", sets: 4, reps: "15–20", note: "Side delt width" },
          { id: "incline_curl", sets: 3, reps: "10–12", note: "Bicep peak — stretched position" },
          { id: "overhead_tricep_ext", sets: 3, reps: "12–15", note: "Tricep long head" },
        ]
      },
      {
        name: "Lower B – Volume",
        exercises: [
          { id: "leg_press", sets: 4, reps: "12–15", note: "Quad volume" },
          { id: "romanian_deadlift", sets: 4, reps: "10–12", note: "Hamstring volume" },
          { id: "hip_thrust", sets: 4, reps: "12–15", note: "Glute volume" },
          { id: "leg_curl", sets: 3, reps: "12–15", note: "Knee flexion hamstring" },
          { id: "calf_raise", sets: 4, reps: "15–20", note: "Full ROM calves" },
          { id: "dead_bug", sets: 3, reps: "10/side", note: "Core anti-extension" },
        ]
      }
    ]
  }
];

// ─── PRINCIPLES ───────────────────────────────────────────────────────────────

const PRINCIPLES = [
  { icon: "📈", title: "Progressive Overload", color: "#5ce08f", summary: "The #1 rule of making progress", body: "Your body only adapts to stress that exceeds what it's used to. If you lift the same weight for the same reps every week, you will stop growing after 2–3 weeks. Progressive overload means systematically increasing the demand over time — adding weight, reps, sets, reducing rest, or improving technique. For beginners, aim to add 5 lbs to upper body lifts and 10 lbs to lower body lifts each week. This 'linear progression' works until the intermediate stage." },
  { icon: "💤", title: "Recovery & Sleep", color: "#a85ce0", summary: "You grow outside the gym, not inside it", body: "Training breaks down muscle tissue. Growth happens during rest, when your body repairs the damage and builds stronger fibers (supercompensation). Sleep is the most powerful recovery tool: 7–9 hours per night is when 70% of daily growth hormone is secreted. Insufficient sleep reduces muscle protein synthesis by up to 30%. Don't skip rest days — muscles need 48–72 hours to recover after intense training." },
  { icon: "🍗", title: "Protein & Nutrition", color: "#e0a85c", summary: "Muscles are made in the kitchen", body: "Muscle is built from protein. Research recommends 0.7–1g per lb of bodyweight (1.6–2.2g/kg) for people training for muscle growth. Carbohydrates are the primary fuel for high-intensity lifting — low carb diets impair strength performance. Caloric surplus supports muscle growth. Caloric deficit allows fat loss. You can't maximally do both at once — choose a primary goal." },
  { icon: "🎯", title: "Mind-Muscle Connection", color: "#e05c5c", summary: "Feel the muscle, don't just move the weight", body: "Consciously focusing on the target muscle during an exercise increases its activation by up to 22% (Calatayud et al., 2016). Before each set, mentally 'connect' with the muscle you're trying to work. For curls — feel the bicep contracting and stretching. For rows — squeeze your shoulder blades. Especially important for lagging muscles dominated by stronger ones." },
  { icon: "🔁", title: "Consistency Over Perfection", color: "#5c8fe0", summary: "The best program is the one you actually do", body: "Skipping 1 workout loses some progress — recoverable. Skipping 2 weeks loses neural adaptations. Missing months means starting over. Long-term consistency vastly outperforms perfect short-term effort followed by dropout. Find a frequency you can realistically maintain. 3 solid sessions per week for 2 years beats the 'perfect' 6-day program you quit in 3 months." },
  { icon: "📐", title: "Form Before Weight", color: "#5ce0d4", summary: "Ego kills progress (and your body)", body: "Poor form under heavy load is the primary cause of gym injuries. Injuries stop all progress for weeks or months. Master the movement pattern with light weight first. The big compound lifts have complex motor patterns that take months to perfect. Film yourself. Your form in the mirror is almost always better than your form from behind." },
  { icon: "📊", title: "Reps, Sets & Intensity", color: "#e0d45c", summary: "How to structure your sets for your goal", body: "Strength: 3–6 reps, heavier loads, longer rest (3–5 min). Trains your nervous system to recruit more muscle fibers. Hypertrophy: 6–20 reps, moderate loads, shorter rest (60–120 sec). Maximizes metabolic stress and mechanical tension. Endurance: 15–30 reps, lighter loads, short rest. For beginners, the full 5–30 rep range is effective — stick to moderate (8–12 reps) and focus on progressing." },
  { icon: "🧠", title: "Deload Weeks", color: "#e07a5c", summary: "Planned recovery prevents injury and boosts gains", body: "Every 4–8 weeks, take a 'deload' — a week at 50–60% of normal weights and/or volume. Fatigue accumulates over weeks and masks fitness gains. A deload reduces systemic fatigue without losing fitness, allowing 'supercompensation' — you often feel stronger the week after a deload than ever. Especially critical once past the beginner stage." },
  { icon: "🔬", title: "Muscle Protein Synthesis", color: "#5ce08f", summary: "The biological mechanism of muscle growth", body: "Every time you train, you trigger a burst of 'Muscle Protein Synthesis' (MPS) — your body building new muscle proteins. MPS peaks 24–48 hours after training and then returns to baseline. Training a muscle more frequently (2–3×/week) means more frequent MPS bursts, which means more total growth over time. This is why beginners on full-body routines often outgrow those on splits — higher frequency = more MPS signals." },
  { icon: "⚖️", title: "Volume, Intensity & Frequency", color: "#a85ce0", summary: "The three training variables — balance them", body: "Volume (total work), Intensity (% of max), and Frequency (how often) are the three primary training variables. You can't maximize all three simultaneously — increasing one requires reducing another. Beginners: low volume, moderate intensity, high frequency. Intermediates: increase volume gradually. Advanced: periodize all three. The most common mistake is adding too much volume too fast, leading to overtraining and injury." },
];

// ─── STORAGE ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "ironiq_v2";
function loadData() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : { workoutLog: [], customRoutine: [], bodyweight: [] }; }
  catch { return { workoutLog: [], customRoutine: [], bodyweight: [] }; }
}
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function MuscleTag({ group, small }) {
  const mg = MUSCLE_GROUPS[group];
  if (!mg) return null;
  return <span style={{ background: mg.color + "22", color: mg.color, border: `1px solid ${mg.color}44`, borderRadius: 6, padding: small ? "2px 7px" : "3px 10px", fontSize: small ? 11 : 12, fontWeight: 600, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{mg.label}</span>;
}
function Badge({ text, color }) {
  return <span style={{ background: color + "22", color, border: `1px solid ${color}55`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{text}</span>;
}

// ─── EXERCISE CARD ────────────────────────────────────────────────────────────

function ExerciseCard({ ex, onClick, compact }) {
  const mg = MUSCLE_GROUPS[ex.group];
  return (
    <div onClick={() => onClick && onClick(ex)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: compact ? "14px 16px" : "18px 20px", cursor: onClick ? "pointer" : "default", transition: "all 0.2s", borderLeft: `3px solid ${mg?.color || "#555"}` }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: compact ? 14 : 16, color: "#f0ede8", marginBottom: 5 }}>{ex.name}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <MuscleTag group={ex.group} small />
            {!compact && ex.secondary?.slice(0, 2).map(s => <MuscleTag key={s} group={s} small />)}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 3 }}>{ex.equipment.split("+")[0].trim()}</div>
          <Badge text={ex.type} color={ex.type === "Compound" ? "#5c8fe0" : "#e0a85c"} />
        </div>
      </div>
      {!compact && <div style={{ marginTop: 12, display: "flex", gap: 16, fontSize: 12, color: "#888" }}>
        <span>📦 {ex.sets} sets</span>
        <span>🔁 {ex.reps} reps</span>
        <span>⏱ {ex.rest} rest</span>
      </div>}
    </div>
  );
}

// ─── EXERCISE DETAIL MODAL ────────────────────────────────────────────────────

function ExerciseDetail({ ex, onClose, onAddToCustom }) {
  const [tab, setTab] = useState("why");
  const mg = MUSCLE_GROUPS[ex.group];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#161412", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, maxWidth: 680, width: "100%", maxHeight: "90vh", overflow: "auto", padding: 32, borderTop: `3px solid ${mg?.color || "#555"}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#f0ede8", margin: "0 0 8px", fontFamily: "'Playfair Display', serif" }}>{ex.name}</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <MuscleTag group={ex.group} />{ex.secondary?.map(s => <MuscleTag key={s} group={s} />)}
              <Badge text={ex.difficulty} color={ex.difficulty === "Beginner" ? "#5ce08f" : ex.difficulty === "Advanced" ? "#e05c5c" : "#e0a85c"} />
              <Badge text={ex.type} color={ex.type === "Compound" ? "#5c8fe0" : "#a85ce0"} />
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#ccc", width: 36, height: 36, borderRadius: 8, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
          {[{ label: "Sets", value: ex.sets }, { label: "Reps", value: ex.reps }, { label: "Rest", value: ex.rest }, { label: "Equipment", value: ex.equipment.split("+")[0].trim() }].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: mg?.color || "#fff" }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 4 }}>
          {[["why", "🎯 Why?"], ["how", "📋 How-to"], ["science", "🔬 Science"], ["mistakes", "⚠️ Mistakes"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "8px 4px", borderRadius: 7, border: "none", background: tab === t ? "rgba(255,255,255,0.12)" : "transparent", color: tab === t ? "#f0ede8" : "#888", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s" }}>{l}</button>
          ))}
        </div>
        <div style={{ lineHeight: 1.75, color: "#c8c4be", fontSize: 14 }}>
          {tab === "why" && <p style={{ margin: 0 }}>{ex.why}</p>}
          {tab === "science" && <p style={{ margin: 0 }}>{ex.science}</p>}
          {tab === "how" && <ol style={{ margin: 0, paddingLeft: 20 }}>{ex.cues.map((c, i) => <li key={i} style={{ marginBottom: 10 }}>{c}</li>)}</ol>}
          {tab === "mistakes" && <div>
            {ex.mistakes.map((m, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(224,92,92,0.08)", borderRadius: 8, padding: "10px 14px", marginBottom: 8, border: "1px solid rgba(224,92,92,0.2)" }}><span style={{ color: "#e05c5c", flexShrink: 0 }}>⚠️</span><span>{m}</span></div>)}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Progressions</div>
              <div style={{ color: "#5ce08f", fontWeight: 500 }}>{ex.progressions.join(" → ")}</div>
            </div>
          </div>}
        </div>
        {onAddToCustom && <button onClick={() => { onAddToCustom(ex); onClose(); }} style={{ marginTop: 24, width: "100%", padding: "12px 0", background: `linear-gradient(135deg, ${mg?.color}33, ${mg?.color}22)`, border: `1px solid ${mg?.color}55`, borderRadius: 10, color: mg?.color, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>+ Add to My Routine</button>}
      </div>
    </div>
  );
}

// ─── TRACKER ─────────────────────────────────────────────────────────────────

function Tracker({ data, setData }) {
  const [activeEx, setActiveEx] = useState(EXERCISES[0].id);
  const [sets, setSets] = useState([{ weight: "", reps: "" }]);
  const [note, setNote] = useState("");
  const [bw, setBw] = useState("");
  const ex = EXERCISES.find(e => e.id === activeEx);
  const logs = (data.workoutLog || []).filter(l => l.exerciseId === activeEx);
  const mg = MUSCLE_GROUPS[ex.group];

  function logWorkout() {
    const validSets = sets.filter(s => s.weight && s.reps);
    if (!validSets.length) return;
    const newLog = { id: Date.now(), exerciseId: activeEx, date: new Date().toLocaleDateString(), sets: validSets, note };
    setData(d => { const u = { ...d, workoutLog: [newLog, ...d.workoutLog] }; saveData(u); return u; });
    setSets([{ weight: "", reps: "" }]); setNote("");
  }
  function logBW() {
    if (!bw) return;
    const entry = { date: new Date().toLocaleDateString(), weight: parseFloat(bw) };
    setData(d => { const u = { ...d, bodyweight: [entry, ...(d.bodyweight || [])] }; saveData(u); return u; });
    setBw("");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
        <h3 style={{ margin: "0 0 16px", color: "#f0ede8", fontSize: 18 }}>📝 Log Workout</h3>
        <select value={activeEx} onChange={e => setActiveEx(e.target.value)} style={{ width: "100%", padding: "10px 12px", marginBottom: 16, background: "#1a1814", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f0ede8", fontSize: 14, cursor: "pointer" }}>
          {EXERCISES.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>SETS</div>
        {sets.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input placeholder="Weight (lbs)" value={s.weight} onChange={e => setSets(p => p.map((ss, ii) => ii === i ? { ...ss, weight: e.target.value } : ss))} style={{ flex: 1, padding: "8px 10px", background: "#1a1814", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f0ede8", fontSize: 13 }} />
            <input placeholder="Reps" value={s.reps} onChange={e => setSets(p => p.map((ss, ii) => ii === i ? { ...ss, reps: e.target.value } : ss))} style={{ width: 70, padding: "8px 10px", background: "#1a1814", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f0ede8", fontSize: 13 }} />
            {sets.length > 1 && <button onClick={() => setSets(p => p.filter((_, ii) => ii !== i))} style={{ background: "rgba(224,92,92,0.15)", border: "1px solid rgba(224,92,92,0.3)", borderRadius: 8, color: "#e05c5c", cursor: "pointer", padding: "0 10px" }}>×</button>}
          </div>
        ))}
        <button onClick={() => setSets(p => [...p, { weight: "", reps: "" }])} style={{ width: "100%", padding: "8px 0", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#888", cursor: "pointer", marginBottom: 12, fontSize: 13 }}>+ Add Set</button>
        <input placeholder="Notes (optional)" value={note} onChange={e => setNote(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: "#1a1814", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f0ede8", fontSize: 13, marginBottom: 12, boxSizing: "border-box" }} />
        <button onClick={logWorkout} style={{ width: "100%", padding: "12px 0", background: `linear-gradient(135deg, ${mg?.color}44, ${mg?.color}22)`, border: `1px solid ${mg?.color}55`, borderRadius: 10, color: mg?.color, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Save Workout</button>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Body Weight</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="Weight (lbs)" value={bw} onChange={e => setBw(e.target.value)} style={{ flex: 1, padding: "8px 10px", background: "#1a1814", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f0ede8", fontSize: 13 }} />
            <button onClick={logBW} style={{ padding: "8px 16px", background: "rgba(92,224,143,0.15)", border: "1px solid rgba(92,224,143,0.3)", borderRadius: 8, color: "#5ce08f", cursor: "pointer", fontWeight: 600 }}>Log</button>
          </div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, overflowY: "auto", maxHeight: 560 }}>
        <h3 style={{ margin: "0 0 16px", color: "#f0ede8", fontSize: 18 }}>📊 History — {ex.name}</h3>
        {logs.length === 0 ? <div style={{ color: "#555", fontSize: 14, textAlign: "center", marginTop: 40 }}>No logs yet.<br />Start tracking!</div>
          : logs.map(log => {
            const maxW = Math.max(...log.sets.map(s => parseFloat(s.weight) || 0));
            const vol = log.sets.reduce((acc, s) => acc + (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0), 0);
            return <div key={log.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontWeight: 600, color: "#f0ede8", fontSize: 14 }}>{log.date}</span><span style={{ fontSize: 12, color: mg?.color }}>Vol: {vol.toLocaleString()} lbs</span></div>
              {log.sets.map((s, i) => <div key={i} style={{ fontSize: 13, color: "#888", marginBottom: 3 }}>Set {i + 1}: <span style={{ color: "#c8c4be" }}>{s.weight} lbs × {s.reps} reps</span>{parseFloat(s.weight) === maxW && <span style={{ color: mg?.color, marginLeft: 6, fontSize: 11 }}>★ PR</span>}</div>)}
              {log.note && <div style={{ marginTop: 6, fontSize: 12, color: "#666", fontStyle: "italic" }}>"{log.note}"</div>}
            </div>;
          })}
        {(data.bodyweight || []).length > 0 && <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Body Weight Log</div>
          {data.bodyweight.slice(0, 8).map((b, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 4 }}><span>{b.date}</span><span style={{ color: "#5ce08f" }}>{b.weight} lbs</span></div>)}
        </div>}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function IronIQ() {
  const [tab, setTab] = useState("home");
  const [selectedEx, setSelectedEx] = useState(null);
  const [filterGroup, setFilterGroup] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDiff, setFilterDiff] = useState("all");
  const [data, setData] = useState(loadData);
  const [customRoutine, setCustomRoutine] = useState(() => loadData().customRoutine || []);
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [activeMethodology, setActiveMethodology] = useState(null);
  const [activePrinciple, setActivePrinciple] = useState(null);
  const [routineFilter, setRoutineFilter] = useState("all");

  function addToCustom(ex) {
    if (customRoutine.find(e => e.id === ex.id)) return;
    setCustomRoutine(prev => {
      const updated = [...prev, ex];
      setData(d => { const nd = { ...d, customRoutine: updated }; saveData(nd); return nd; });
      return updated;
    });
  }
  function removeFromCustom(id) {
    setCustomRoutine(prev => {
      const updated = prev.filter(e => e.id !== id);
      setData(d => { const nd = { ...d, customRoutine: updated }; saveData(nd); return nd; });
      return updated;
    });
  }

  const filteredExercises = EXERCISES.filter(e =>
    (filterGroup === "all" || e.group === filterGroup) &&
    (filterType === "all" || e.type === filterType) &&
    (filterDiff === "all" || e.difficulty === filterDiff)
  );

  const filteredRoutines = routineFilter === "all" ? ROUTINES : ROUTINES.filter(r => r.methodology === routineFilter || r.level.toLowerCase().includes(routineFilter));

  const TABS = [
    { id: "home", label: "🏠 Home" },
    { id: "exercises", label: "💪 Exercises" },
    { id: "methodologies", label: "📚 Methods" },
    { id: "routines", label: "📋 Routines" },
    { id: "custom", label: "✏️ My Plan" },
    { id: "tracker", label: "📊 Tracker" },
    { id: "principles", label: "🎓 Education" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0e0c0a", color: "#f0ede8", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1814; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }
        select, input, button, textarea { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(14,12,10,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 20px", display: "flex", gap: 2, overflowX: "auto" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: "#e0a85c", padding: "14px 16px 14px 0", marginRight: 4, whiteSpace: "nowrap", letterSpacing: "-0.02em" }}>IronIQ</div>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "14px 12px", background: "none", border: "none", color: tab === t.id ? "#e0a85c" : "#666", cursor: "pointer", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, whiteSpace: "nowrap", borderBottom: tab === t.id ? "2px solid #e0a85c" : "2px solid transparent", transition: "all 0.15s" }}>{t.label}</button>
        ))}
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>

        {/* ── HOME ── */}
        {tab === "home" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #1a1206 0%, #0e0c0a 60%, #060a12 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "52px 48px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, background: "radial-gradient(circle, rgba(224,168,92,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
              <h1 style={{ fontSize: "clamp(30px, 6vw, 54px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, background: "linear-gradient(135deg, #e0a85c, #f0ede8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Personal<br />Trainer. Explained.</h1>
              <p style={{ color: "#888", fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: "0 0 28px" }}>Not just what to do — the science of <em>why</em> every exercise works, how elite coaches build programs, and how to track real progress over time.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => setTab("exercises")} style={{ padding: "12px 24px", background: "linear-gradient(135deg, #e0a85c, #c8883a)", border: "none", borderRadius: 10, color: "#0e0c0a", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Browse Exercises →</button>
                <button onClick={() => setTab("methodologies")} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#f0ede8", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Training Methods</button>
                <button onClick={() => setTab("routines")} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#f0ede8", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>View Routines</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
              {[{ n: EXERCISES.length, label: "Exercises", icon: "💪", color: "#5c8fe0" }, { n: ROUTINES.length, label: "Pre-built Routines", icon: "📋", color: "#e0a85c" }, { n: METHODOLOGIES.length, label: "Methodologies", icon: "📚", color: "#a85ce0" }, { n: PRINCIPLES.length, label: "Science Principles", icon: "🔬", color: "#5ce08f" }].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 18px", borderTop: `2px solid ${s.color}33` }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 28px" }}>
              <h2 style={{ fontSize: 26, margin: "0 0 20px", color: "#f0ede8" }}>New to the gym? Start here.</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { step: "1", title: "Learn the movements", desc: "Browse Exercises. For each one, read the 'Why?' tab — understanding the purpose transforms how you train.", tab: "exercises" },
                  { step: "2", title: "Understand the methodology", desc: "Visit Training Methods to understand the systems elite coaches use — StrongLifts, 5/3/1, PPL and more.", tab: "methodologies" },
                  { step: "3", title: "Pick a pre-built routine", desc: "Beginner? Start with StrongLifts 5×5 or Full Body 3×/Week. They're the most evidence-backed beginner approaches.", tab: "routines" },
                  { step: "4", title: "Track & progress", desc: "Use the Tracker every workout. Adding weight over time — progressive overload — is the mechanism of all progress.", tab: "tracker" },
                ].map(s => (
                  <div key={s.step} onClick={() => setTab(s.tab)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(224,168,92,0.15)", border: "1px solid rgba(224,168,92,0.3)", color: "#e0a85c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{s.step}</div>
                      <div><div style={{ fontWeight: 700, color: "#f0ede8", marginBottom: 4 }}>{s.title}</div><div style={{ fontSize: 13, color: "#777", lineHeight: 1.5 }}>{s.desc}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── EXERCISES ── */}
        {tab === "exercises" && (
          <div>
            <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>Exercise Library</h2>
            <p style={{ color: "#777", margin: "0 0 20px" }}>Click any exercise to learn what it targets and exactly how to perform it. {EXERCISES.length} exercises across {Object.keys(MUSCLE_GROUPS).length} muscle groups.</p>

            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["all", ...Object.keys(MUSCLE_GROUPS)].map(k => {
                  const mg = MUSCLE_GROUPS[k];
                  return <button key={k} onClick={() => setFilterGroup(k)} style={{ padding: "6px 14px", borderRadius: 20, cursor: "pointer", background: filterGroup === k ? (mg?.color || "#e0a85c") + "22" : "rgba(255,255,255,0.04)", border: filterGroup === k ? `1px solid ${(mg?.color || "#e0a85c")}55` : "1px solid rgba(255,255,255,0.08)", color: filterGroup === k ? (mg?.color || "#e0a85c") : "#888", fontSize: 12, fontWeight: 600 }}>{k === "all" ? "All" : mg.label}</button>;
                })}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[["all", "All Types"], ["Compound", "Compound"], ["Isolation", "Isolation"]].map(([v, l]) => (
                <button key={v} onClick={() => setFilterType(v)} style={{ padding: "5px 12px", borderRadius: 20, cursor: "pointer", background: filterType === v ? "rgba(92,142,224,0.2)" : "rgba(255,255,255,0.04)", border: filterType === v ? "1px solid rgba(92,142,224,0.5)" : "1px solid rgba(255,255,255,0.08)", color: filterType === v ? "#5c8fe0" : "#888", fontSize: 12 }}>{l}</button>
              ))}
              {[["Beginner", "#5ce08f"], ["Intermediate", "#e0a85c"], ["Advanced", "#e05c5c"]].map(([v, c]) => (
                <button key={v} onClick={() => setFilterDiff(filterDiff === v ? "all" : v)} style={{ padding: "5px 12px", borderRadius: 20, cursor: "pointer", background: filterDiff === v ? c + "22" : "rgba(255,255,255,0.04)", border: filterDiff === v ? `1px solid ${c}55` : "1px solid rgba(255,255,255,0.08)", color: filterDiff === v ? c : "#888", fontSize: 12 }}>{v}</button>
              ))}
            </div>

            <div style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>{filteredExercises.length} exercises</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
              {filteredExercises.map(ex => <ExerciseCard key={ex.id} ex={ex} onClick={e => setSelectedEx(e)} />)}
            </div>
          </div>
        )}

        {/* ── METHODOLOGIES ── */}
        {tab === "methodologies" && (
          <div>
            <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>Training Methodologies</h2>
            <p style={{ color: "#777", margin: "0 0 24px" }}>The systems elite coaches and competitive athletes actually use — explained in depth. Understanding these frameworks transforms how you approach training.</p>
            <div style={{ display: "grid", gap: 16 }}>
              {METHODOLOGIES.map(m => (
                <div key={m.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
                  <div onClick={() => setActiveMethodology(activeMethodology === m.id ? null : m.id)} style={{ padding: "22px 26px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ width: 50, height: 50, borderRadius: 12, background: m.color + "18", border: `1px solid ${m.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{m.icon}</div>
                      <div>
                        <h3 style={{ margin: "0 0 4px", fontSize: 20, color: "#f0ede8" }}>{m.name}</h3>
                        <div style={{ fontSize: 13, color: m.color, fontWeight: 500 }}>{m.tagline}</div>
                        <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>For: {m.whoFor.split(".")[0]}</div>
                      </div>
                    </div>
                    <span style={{ color: "#555", fontSize: 22, flexShrink: 0 }}>{activeMethodology === m.id ? "▲" : "▼"}</span>
                  </div>
                  {activeMethodology === m.id && (
                    <div style={{ padding: "0 26px 26px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Overview</div>
                          <p style={{ margin: "0 0 16px", color: "#c8c4be", lineHeight: 1.75, fontSize: 14 }}>{m.overview}</p>
                          <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>How It Works</div>
                          <p style={{ margin: 0, color: "#c8c4be", lineHeight: 1.75, fontSize: 14 }}>{m.howItWorks}</p>
                        </div>
                        <div>
                          <div style={{ fontSize: 12, color: "#888", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Key Principles</div>
                          {m.keyPrinciples.map((p, i) => (
                            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                              <div style={{ width: 6, height: 6, borderRadius: "50%", background: m.color, marginTop: 7, flexShrink: 0 }} />
                              <span style={{ fontSize: 13, color: "#c8c4be", lineHeight: 1.6 }}>{p}</span>
                            </div>
                          ))}
                          <div style={{ marginTop: 16, padding: "12px 16px", background: m.color + "10", border: `1px solid ${m.color}22`, borderRadius: 10 }}>
                            <div style={{ fontSize: 11, color: m.color, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, marginBottom: 4 }}>Who Is This For?</div>
                            <div style={{ fontSize: 13, color: "#c8c4be" }}>{m.whoFor}</div>
                          </div>
                          <button onClick={() => { setTab("routines"); setRoutineFilter(m.id); }} style={{ marginTop: 12, width: "100%", padding: "10px 0", background: m.color + "18", border: `1px solid ${m.color}33`, borderRadius: 10, color: m.color, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                            View {m.name} Routines →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ROUTINES ── */}
        {tab === "routines" && (
          <div>
            <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>Pre-Built Routines</h2>
            <p style={{ color: "#777", margin: "0 0 20px" }}>Science-backed programs from beginner to advanced. Each routine shows the methodology it's built on and exactly why each exercise is included.</p>

            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              <button onClick={() => setRoutineFilter("all")} style={{ padding: "6px 14px", borderRadius: 20, cursor: "pointer", background: routineFilter === "all" ? "rgba(224,168,92,0.2)" : "rgba(255,255,255,0.04)", border: routineFilter === "all" ? "1px solid rgba(224,168,92,0.5)" : "1px solid rgba(255,255,255,0.08)", color: routineFilter === "all" ? "#e0a85c" : "#888", fontSize: 12, fontWeight: 600 }}>All ({ROUTINES.length})</button>
              {METHODOLOGIES.map(m => {
                const count = ROUTINES.filter(r => r.methodology === m.id).length;
                if (!count) return null;
                return <button key={m.id} onClick={() => setRoutineFilter(m.id)} style={{ padding: "6px 14px", borderRadius: 20, cursor: "pointer", background: routineFilter === m.id ? m.color + "22" : "rgba(255,255,255,0.04)", border: routineFilter === m.id ? `1px solid ${m.color}55` : "1px solid rgba(255,255,255,0.08)", color: routineFilter === m.id ? m.color : "#888", fontSize: 12, fontWeight: 600 }}>{m.icon} {m.name} ({count})</button>;
              })}
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {filteredRoutines.map(r => {
                const methodology = METHODOLOGIES.find(m => m.id === r.methodology);
                return (
                  <div key={r.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
                    <div onClick={() => setActiveRoutine(activeRoutine === r.id ? null : r.id)} style={{ padding: "22px 26px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                          <h3 style={{ margin: 0, fontSize: 20, color: "#f0ede8" }}>{r.name}</h3>
                          <span style={{ background: r.tagColor + "22", color: r.tagColor, border: `1px solid ${r.tagColor}44`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{r.tag}</span>
                          <span style={{ background: "rgba(255,255,255,0.05)", color: "#888", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "2px 10px", fontSize: 11 }}>{r.level}</span>
                        </div>
                        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#888", flexWrap: "wrap" }}>
                          <span>📅 {r.frequency}</span>
                          <span>🎯 {r.goal}</span>
                          {methodology && <span style={{ color: methodology.color }}>Based on: {methodology.icon} {methodology.name}</span>}
                        </div>
                      </div>
                      <span style={{ color: "#555", fontSize: 22, flexShrink: 0 }}>{activeRoutine === r.id ? "▲" : "▼"}</span>
                    </div>

                    {activeRoutine === r.id && (
                      <div style={{ padding: "0 26px 26px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                          <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>About This Routine</div>
                            <p style={{ margin: 0, color: "#c8c4be", lineHeight: 1.7, fontSize: 13 }}>{r.description}</p>
                          </div>
                          <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>The Science</div>
                            <p style={{ margin: 0, color: "#c8c4be", lineHeight: 1.7, fontSize: 13, fontStyle: "italic" }}>{r.science}</p>
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                          {r.days.map((day, di) => (
                            <div key={di} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 18 }}>
                              <div style={{ fontWeight: 700, color: r.tagColor, marginBottom: 14, fontSize: 15, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}>{day.name}</div>
                              {day.exercises.map((de, ei) => {
                                const ex = EXERCISES.find(e => e.id === de.id);
                                if (!ex) return null;
                                const mg = MUSCLE_GROUPS[ex.group];
                                return (
                                  <div key={ei} style={{ marginBottom: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                      <span onClick={() => setSelectedEx(ex)} style={{ fontWeight: 600, color: "#e0d8d0", cursor: "pointer", fontSize: 13, textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.15)" }}>{ex.name}</span>
                                      <span style={{ fontSize: 12, color: mg?.color, flexShrink: 0 }}>{de.sets}×{de.reps}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: "#555", marginTop: 2, lineHeight: 1.4 }}>{de.note}</div>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MY PLAN ── */}
        {tab === "custom" && (
          <div>
            <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>My Routine</h2>
            <p style={{ color: "#777", margin: "0 0 24px" }}>Build your own plan. Add exercises from the library. The routine checker will flag imbalances.</p>

            {customRoutine.length === 0 ? (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(255,255,255,0.08)", borderRadius: 18, padding: "52px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🏗️</div>
                <div style={{ color: "#777", fontSize: 16, marginBottom: 16 }}>Your routine is empty.</div>
                <button onClick={() => setTab("exercises")} style={{ padding: "10px 24px", background: "rgba(224,168,92,0.15)", border: "1px solid rgba(224,168,92,0.3)", borderRadius: 10, color: "#e0a85c", fontWeight: 600, cursor: "pointer" }}>Browse exercises to add →</button>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: "#888", fontSize: 14 }}>{customRoutine.length} exercise{customRoutine.length !== 1 ? "s" : ""}</div>
                  <button onClick={() => setTab("exercises")} style={{ padding: "8px 16px", background: "rgba(224,168,92,0.1)", border: "1px solid rgba(224,168,92,0.25)", borderRadius: 8, color: "#e0a85c", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>+ Add more</button>
                </div>
                <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
                  {customRoutine.map((ex, i) => {
                    const mg = MUSCLE_GROUPS[ex.group];
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 18px", borderLeft: `3px solid ${mg?.color || "#555"}` }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: "#f0ede8", marginBottom: 4 }}>{ex.name}</div>
                          <div style={{ display: "flex", gap: 8 }}><MuscleTag group={ex.group} small /><span style={{ fontSize: 12, color: "#666" }}>{ex.sets} sets × {ex.reps} reps</span></div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => setSelectedEx(ex)} style={{ padding: "6px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#888", cursor: "pointer", fontSize: 12 }}>View</button>
                          <button onClick={() => removeFromCustom(ex.id)} style={{ padding: "6px 12px", background: "rgba(224,92,92,0.08)", border: "1px solid rgba(224,92,92,0.2)", borderRadius: 8, color: "#e05c5c", cursor: "pointer", fontSize: 12 }}>Remove</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ padding: 20, background: "rgba(92,224,143,0.05)", border: "1px solid rgba(92,224,143,0.15)", borderRadius: 14 }}>
                  <div style={{ fontWeight: 700, color: "#5ce08f", marginBottom: 10, fontSize: 15 }}>✅ Routine Analysis</div>
                  {(() => {
                    const groups = [...new Set(customRoutine.map(e => e.group))];
                    const hasCompound = customRoutine.some(e => e.type === "Compound");
                    const hasPush = customRoutine.some(e => ["chest","shoulders","triceps"].includes(e.group));
                    const hasPull = customRoutine.some(e => ["back","biceps"].includes(e.group));
                    const tips = [];
                    if (!hasCompound) tips.push({ text: "Add at least one compound exercise (squat, deadlift, bench) for maximum hormonal response", type: "warn" });
                    if (!groups.includes("legs") && !groups.includes("glutes")) tips.push({ text: "No leg exercises — legs are the largest muscle group. Don't skip leg day.", type: "warn" });
                    if (!hasPull) tips.push({ text: "No back/pull exercises detected. Neglecting pulling creates shoulder imbalances over time.", type: "warn" });
                    if (!groups.includes("core")) tips.push({ text: "Consider adding core exercises — they protect your spine during all compound lifts.", type: "info" });
                    if (hasPush && !hasPull) tips.push({ text: "You're pushing without pulling. Add rows or pulldowns to balance your program.", type: "warn" });
                    if (customRoutine.length > 8) tips.push({ text: "Your routine has a lot of exercises. Consider splitting it across multiple days.", type: "info" });
                    if (tips.length === 0) tips.push({ text: "Looking balanced! Apply progressive overload — add weight or reps every session.", type: "ok" });
                    return tips.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                        <span>{t.type === "warn" ? "⚠️" : t.type === "info" ? "💡" : "✅"}</span>
                        <span style={{ fontSize: 13, color: "#c8c4be", lineHeight: 1.5 }}>{t.text}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TRACKER ── */}
        {tab === "tracker" && (
          <div>
            <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>Progress Tracker</h2>
            <p style={{ color: "#777", margin: "0 0 24px" }}>Log your workouts and track weight lifted over time. Progressive overload — adding weight consistently — is the entire mechanism of muscle growth and strength gain.</p>
            <Tracker data={data} setData={setData} />
          </div>
        )}

        {/* ── EDUCATION ── */}
        {tab === "principles" && (
          <div>
            <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>Training Science</h2>
            <p style={{ color: "#777", margin: "0 0 24px" }}>Understanding these principles is what separates people who make consistent progress from those who plateau indefinitely. Click any card to expand.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
              {PRINCIPLES.map((p, i) => (
                <div key={i} onClick={() => setActivePrinciple(activePrinciple === i ? null : i)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px", cursor: "pointer", transition: "all 0.2s", borderTop: `3px solid ${p.color}55` }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: p.color + "18", border: `1px solid ${p.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#f0ede8", fontSize: 16, marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 13, color: "#888" }}>{p.summary}</div>
                    </div>
                    <span style={{ color: "#555", fontSize: 16 }}>{activePrinciple === i ? "▲" : "▼"}</span>
                  </div>
                  {activePrinciple === i && <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 14, color: "#c8c4be", lineHeight: 1.75 }}>{p.body}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {selectedEx && <ExerciseDetail ex={selectedEx} onClose={() => setSelectedEx(null)} onAddToCustom={addToCustom} />}
    </div>
  );
}
