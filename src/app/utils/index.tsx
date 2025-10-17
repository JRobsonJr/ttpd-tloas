export const getLastDayOfMonth = (month: number) => {
  const daysInMonth: Record<number, number> = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  return daysInMonth[month] || 31;
};

export const ttpdTracks = [
  "",
  "Fortnight",
  "The Tortured Poets Department",
  "My Boy Only Breaks His Favorite Toys",
  "Down Bad",
  "So Long, London",
  "But Daddy I Love Him",
  "Fresh Out the Slammer",
  "Florida!!!",
  "Guilty as Sin?",
  "Who's Afraid of Little Old Me?",
  "I Can Fix Him (No Really I Can)",
  "loml",
  "I Can Do It with a Broken Heart",
  "The Smallest Man Who Ever Lived",
  "The Alchemy",
  "Clara Bow",
  "The Black Dog",
  "Imgonnagetyouback",
  "The Albatross",
  "Chloe or Sam or Sophia or Marcus",
  "How Did It End?",
  "So High School",
  "I Hate It Here",
  "Thank You Aimee",
  "I Look in People's Windows",
  "The Prophecy",
  "Cassandra",
  "Peter",
  "The Bolter",
  "Robin",
  "The Manuscript"
];

export const tloasTracks = [
  "",
  "The Fate of Ophelia",
  "Elizabeth Taylor",
  "Opalite",
  "Father Figure",
  "Eldest Daughter",
  "Ruin The Friendship",
  "Actually Romantic",
  "Wi$h Li$t",
  "Wood",
  "CANCELLED!",
  "Honey",
  "The Life of a Showgirl"
];

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
