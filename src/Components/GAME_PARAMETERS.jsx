const GAME_PARAMETERS = [
  {
    playerCount: 5,
    missionsBreakdown: [
      { missionIndex: 1, numberOfPlayers: 2, team: [], votes: [] },
      { missionIndex: 2, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 3, numberOfPlayers: 2, team: [], votes: [] },
      { missionIndex: 4, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 5, numberOfPlayers: 3, team: [], votes: [] },
    ],
    roles: ["Merlin", "Good guy", "Good guy", "Assassin", "Bad guy", "Lovers", "Jester"],
  },
  {
    playerCount: 6,
    missionsBreakdown: [
      { missionIndex: 1, numberOfPlayers: 2, team: [], votes: [] },
      { missionIndex: 2, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 3, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 4, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 5, numberOfPlayers: 4, team: [], votes: [] },
    ],
    roles: ["Merlin", "Good guy", "Good guy", "Good guy", "Assassin", "Bad guy", "Lovers", "Jester"],
  },
  {
    playerCount: 7,
    missionsBreakdown: [
      { missionIndex: 1, numberOfPlayers: 2, team: [], votes: [] },
      { missionIndex: 2, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 3, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 4, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 5, numberOfPlayers: 4, team: [], votes: [] },
    ],
    roles: ["Merlin", "Good guy", "Good guy", "Good guy", "Assassin", "Bad guy", "Bad guy", "Lovers", "Jester"],
  },
  {
    playerCount: 8,
    missionsBreakdown: [
      { missionIndex: 1, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 2, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 3, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 4, numberOfPlayers: 5, team: [], votes: [] },
      { missionIndex: 5, numberOfPlayers: 5, team: [], votes: [] },
    ],
    roles: ["Merlin", "Good guy", "Good guy", "Good guy", "Good guy", "Assassin", "Bad guy", "Bad guy", "Lovers", "Jester"],
  },
  {
    playerCount: 9,
    missionsBreakdown: [
      { missionIndex: 1, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 2, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 3, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 4, numberOfPlayers: 5, team: [], votes: [] },
      { missionIndex: 5, numberOfPlayers: 5, team: [], votes: [] },
    ],
    roles: ["Merlin", "Good guy", "Good guy", "Good guy", "Good guy", "Good guy", "Assassin", "Bad guy", "Bad guy", "Lovers", "Jester"],
  },
  {
    playerCount: 10,
    missionsBreakdown: [
      { missionIndex: 1, numberOfPlayers: 3, team: [], votes: [] },
      { missionIndex: 2, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 3, numberOfPlayers: 4, team: [], votes: [] },
      { missionIndex: 4, numberOfPlayers: 5, team: [], votes: [] },
      { missionIndex: 5, numberOfPlayers: 5, team: [], votes: [] },
    ],
    roles: ["Merlin", "Good guy", "Good guy", "Good guy", "Good guy", "Good guy", "Assassin", "Bad guy", "Bad guy", "Bad guy", "Lovers", "Jester"],
  },
];

const ROLES = {
  MERLIN: 'Merlin',
  PERCIVAL: 'Percival',
  ASSASSIN: 'Assassin',
  MORDRED: 'Mordred',
  MORGANA: 'Morgana',
  OBERON: 'Oberon',
  MINION: 'Minion',
  SERVANT: 'Good guy',
  LOVERS: 'Lovers',
  JESTER: 'Jester'
};

const ROLE_DESCRIPTIONS = {
  MERLIN: 'Knows the evil players except Mordred.',
  PERCIVAL: 'Knows who Merlin is.',
  ASSASSIN: 'Can assassinate Merlin at the end of the game.',
  MORDRED: 'Unknown to Merlin.',
  MORGANA: 'Appears as Merlin to Percival.',
  OBERON: 'Unknown to evil players.',
  MINION: 'An evil minion of Mordred.',
  SERVANT: 'A loyal servant of Arthur.',
  LOVERS: 'Two good players who know each other. If both survive and good wins, they win. If one dies, they both die.',
  JESTER: 'A neutral player whose goal is to be mistaken for Merlin. If selected as Merlin by the Assassins, only the Jester wins.'
};

export { GAME_PARAMETERS, ROLES, ROLE_DESCRIPTIONS };
