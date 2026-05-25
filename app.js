// 2026 World Cup Tracker & Simulator Dashboard - Core JavaScript Code

// ==========================================
// 1. DATA STORES & DATABASE SETUP
// ==========================================

const HOST_COUNTRIES = {
  USA: { name: "United States", flag: "🇺🇸", colorClass: "usa", rating: 80 },
  Canada: { name: "Canada", flag: "🇨🇦", colorClass: "canada", rating: 74 },
  Mexico: { name: "Mexico", flag: "🇲🇽", colorClass: "mexico", rating: 77 }
};

const VENUES = [
  // USA Venues
  { city: "Dallas", stadium: "AT&T Stadium", capacity: 93000, country: "USA", matches: "9 Matches (including Semi-final)" },
  { city: "New York/New Jersey", stadium: "MetLife Stadium", capacity: 82500, country: "USA", matches: "8 Matches (including Final)" },
  { city: "Los Angeles", stadium: "SoFi Stadium", capacity: 70000, country: "USA", matches: "8 Matches (including Quarter-final)" },
  { city: "Atlanta", stadium: "Mercedes-Benz Stadium", capacity: 71000, country: "USA", matches: "8 Matches (including Semi-final)" },
  { city: "Boston", stadium: "Gillette Stadium", capacity: 65000, country: "USA", matches: "6 Matches (including Quarter-final)" },
  { city: "Houston", stadium: "NRG Stadium", capacity: 72000, country: "USA", matches: "7 Matches (including Round of 16)" },
  { city: "Kansas City", stadium: "Arrowhead Stadium", capacity: 76000, country: "USA", matches: "6 Matches (including Quarter-final)" },
  { city: "Miami", stadium: "Hard Rock Stadium", capacity: 64000, country: "USA", matches: "7 Matches (including 3rd Place Match)" },
  { city: "Philadelphia", stadium: "Lincoln Financial Field", capacity: 69000, country: "USA", matches: "6 Matches (including Round of 16)" },
  { city: "San Francisco", stadium: "Levi's Stadium", capacity: 68000, country: "USA", matches: "6 Matches (including Round of 32)" },
  { city: "Seattle", stadium: "Lumen Field", capacity: 69000, country: "USA", matches: "6 Matches (including Round of 32)" },
  
  // Canada Venues
  { city: "Vancouver", stadium: "BC Place", capacity: 54000, country: "Canada", matches: "7 Matches (including Round of 16)" },
  { city: "Toronto", stadium: "BMO Field", capacity: 45000, country: "Canada", matches: "6 Matches (including Round of 32)" },
  
  // Mexico Venues
  { city: "Mexico City", stadium: "Estadio Azteca", capacity: 87500, country: "Mexico", matches: "5 Matches (including Opening Match)" },
  { city: "Guadalajara", stadium: "Estadio Akron", capacity: 48000, country: "Mexico", matches: "4 Matches (Group Stage)" },
  { city: "Monterrey", stadium: "Estadio BBVA", capacity: 53500, country: "Mexico", matches: "4 Matches (including Round of 32)" }
];

const TEAMS_DATA = [
  // Group A
  { name: "USA", code: "USA", group: "A", flag: "🇺🇸", rating: 81, att: 82, def: 80 },
  { name: "Ecuador", code: "ECU", group: "A", flag: "🇪🇨", rating: 78, att: 77, def: 79 },
  { name: "Cameroon", code: "CMR", group: "A", flag: "🇨🇲", rating: 75, att: 76, def: 74 },
  { name: "New Zealand", code: "NZL", group: "A", flag: "🇳🇿", rating: 70, att: 68, def: 71 },

  // Group B
  { name: "England", code: "ENG", group: "B", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 86, att: 87, def: 85 },
  { name: "Switzerland", code: "SUI", group: "B", flag: "🇨🇭", rating: 79, att: 78, def: 80 },
  { name: "Nigeria", code: "NGA", group: "B", flag: "🇳🇬", rating: 77, att: 79, def: 75 },
  { name: "Iraq", code: "IRQ", group: "B", flag: "🇮🇶", rating: 70, att: 70, def: 69 },

  // Group C
  { name: "Argentina", code: "ARG", group: "C", flag: "🇦🇷", rating: 87, att: 88, def: 86 },
  { name: "Poland", code: "POL", group: "C", flag: "🇵🇱", rating: 78, att: 79, def: 76 },
  { name: "Egypt", code: "EGY", group: "C", flag: "🇪🇬", rating: 76, att: 78, def: 74 },
  { name: "Jamaica", code: "JAM", group: "C", flag: "🇯🇲", rating: 71, att: 72, def: 70 },

  // Group D
  { name: "France", code: "FRA", group: "D", flag: "🇫🇷", rating: 88, att: 90, def: 86 },
  { name: "Denmark", code: "DEN", group: "D", flag: "🇩🇰", rating: 80, att: 78, def: 81 },
  { name: "Tunisia", code: "TUN", group: "D", flag: "🇹🇳", rating: 74, att: 72, def: 75 },
  { name: "Australia", code: "AUS", group: "D", flag: "🇦🇺", rating: 73, att: 72, def: 74 },

  // Group E
  { name: "Spain", code: "ESP", group: "E", flag: "🇪🇸", rating: 85, att: 84, def: 86 },
  { name: "Germany", code: "GER", group: "E", flag: "🇩🇪", rating: 85, att: 85, def: 84 },
  { name: "Japan", code: "JPN", group: "E", flag: "🇯🇵", rating: 79, att: 80, def: 78 },
  { name: "Morocco", code: "MAR", group: "E", flag: "🇲🇦", rating: 80, att: 79, def: 82 },

  // Group F
  { name: "Canada", code: "CAN", group: "F", flag: "🇨🇦", rating: 76, att: 78, def: 74 },
  { name: "Croatia", code: "CRO", group: "F", flag: "🇭🇷", rating: 81, att: 79, def: 82 },
  { name: "Algeria", code: "ALG", group: "F", flag: "🇩🇿", rating: 75, att: 76, def: 74 },
  { name: "Chile", code: "CHI", group: "F", flag: "🇨🇱", rating: 75, att: 74, def: 75 },

  // Group G
  { name: "Brazil", code: "BRA", group: "G", flag: "🇧🇷", rating: 86, att: 87, def: 84 },
  { name: "Serbia", code: "SRB", group: "G", flag: "🇷🇸", rating: 77, att: 78, def: 76 },
  { name: "South Korea", code: "KOR", group: "G", flag: "🇰🇷", rating: 77, att: 78, def: 76 },
  { name: "Panama", code: "PAN", group: "G", flag: "🇵🇦", rating: 71, att: 70, def: 71 },

  // Group H
  { name: "Portugal", code: "POR", group: "H", flag: "🇵🇹", rating: 84, att: 85, def: 83 },
  { name: "Uruguay", code: "URU", group: "H", flag: "🇺🇾", rating: 81, att: 81, def: 81 },
  { name: "Ghana", code: "GHA", group: "H", flag: "🇬🇭", rating: 75, att: 76, def: 74 },
  { name: "Peru", code: "PER", group: "H", flag: "🇵🇪", rating: 74, att: 73, def: 75 },

  // Group I
  { name: "Italy", code: "ITA", group: "I", flag: "🇮🇹", rating: 83, att: 81, def: 84 },
  { name: "Ecuador Team", code: "COL", group: "I", flag: "🇨🇴", rating: 80, att: 79, def: 80 }, // Colombia
  { name: "Senegal", code: "SEN", group: "I", flag: "🇸🇳", rating: 78, att: 77, def: 78 },
  { name: "Qatar", code: "QAT", group: "I", flag: "🇶🇦", rating: 71, att: 70, def: 71 },

  // Group J
  { name: "Mexico", code: "MEX", group: "J", flag: "🇲🇽", rating: 78, att: 78, def: 77 },
  { name: "Netherlands", code: "NED", group: "J", flag: "🇳🇱", rating: 83, att: 82, def: 84 },
  { name: "Sweden", code: "SWE", group: "J", flag: "🇸🇪", rating: 77, att: 76, def: 77 },
  { name: "Saudi Arabia", code: "KSA", group: "J", flag: "🇸🇦", rating: 72, att: 71, def: 72 },

  // Group K
  { name: "Belgium", code: "BEL", group: "K", flag: "🇧🇪", rating: 82, att: 83, def: 81 },
  { name: "Ukraine", code: "UKR", group: "K", flag: "🇺🇦", rating: 77, att: 77, def: 76 },
  { name: "Austria", code: "AUT", group: "K", flag: "🇦🇹", rating: 77, att: 76, def: 77 },
  { name: "South Africa", code: "RSA", group: "K", flag: "🇿🇦", rating: 72, att: 71, def: 72 },

  // Group L
  { name: "Wales", code: "WAL", group: "L", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", rating: 75, att: 74, def: 75 },
  { name: "Scotland", code: "SCO", group: "L", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", rating: 75, att: 73, def: 76 },
  { name: "Iran", code: "IRN", group: "L", flag: "🇮🇷", rating: 74, att: 75, def: 73 },
  { name: "Costa Rica", code: "CRC", group: "L", flag: "🇨🇷", rating: 72, att: 71, def: 73 }
];

// Fix Colombia code mapping name
const colomObj = TEAMS_DATA.find(t => t.code === "COL");
if (colomObj) colomObj.name = "Colombia";

// Real Squad Roster Databases for 9 Selected Teams
const REAL_SQUADS = {
  USA: [
    { name: "Matt Turner", pos: "GK", rating: 78 },
    { name: "Ethan Horvath", pos: "GK", rating: 72 },
    { name: "Sean Johnson", pos: "GK", rating: 70 },
    { name: "Antonee Robinson", pos: "DF", rating: 80 },
    { name: "Sergiño Dest", pos: "DF", rating: 77 },
    { name: "Tim Ream", pos: "DF", rating: 76 },
    { name: "Chris Richards", pos: "DF", rating: 76 },
    { name: "Cameron Carter-Vickers", pos: "DF", rating: 75 },
    { name: "Joe Scally", pos: "DF", rating: 74 },
    { name: "Miles Robinson", pos: "DF", rating: 74 },
    { name: "Walker Zimmerman", pos: "DF", rating: 73 },
    { name: "Weston McKennie", pos: "MF", rating: 80 },
    { name: "Tyler Adams", pos: "MF", rating: 79 },
    { name: "Yunus Musah", pos: "MF", rating: 78 },
    { name: "Gio Reyna", pos: "MF", rating: 78 },
    { name: "Malik Tillman", pos: "MF", rating: 76 },
    { name: "Johnny Cardoso", pos: "MF", rating: 75 },
    { name: "Luca de la Torre", pos: "MF", rating: 73 },
    { name: "Christian Pulisic", pos: "FW", rating: 83 },
    { name: "Folarin Balogun", pos: "FW", rating: 79 },
    { name: "Timothy Weah", pos: "FW", rating: 78 },
    { name: "Ricardo Pepi", pos: "FW", rating: 76 },
    { name: "Josh Sargent", pos: "FW", rating: 75 },
    { name: "Brenden Aaronson", pos: "FW", rating: 74 },
    { name: "Alejandro Zendejas", pos: "FW", rating: 73 },
    { name: "Cade Cowell", pos: "FW", rating: 71 }
  ],
  Canada: [
    { name: "Maxime Crépeau", pos: "GK", rating: 73 },
    { name: "Milan Borjan", pos: "GK", rating: 72 },
    { name: "Dayne St. Clair", pos: "GK", rating: 71 },
    { name: "Alphonso Davies", pos: "DF", rating: 84 },
    { name: "Alistair Johnston", pos: "DF", rating: 77 },
    { name: "Kamal Miller", pos: "DF", rating: 74 },
    { name: "Moïse Bombito", pos: "DF", rating: 74 },
    { name: "Richie Laryea", pos: "DF", rating: 73 },
    { name: "Derek Cornelius", pos: "DF", rating: 73 },
    { name: "Sam Adekugbe", pos: "DF", rating: 72 },
    { name: "Joel Waterman", pos: "DF", rating: 71 },
    { name: "Stephen Eustáquio", pos: "MF", rating: 79 },
    { name: "Ismaël Koné", pos: "MF", rating: 76 },
    { name: "Mathieu Choinière", pos: "MF", rating: 73 },
    { name: "Jonathan Osorio", pos: "MF", rating: 73 },
    { name: "Samuel Piette", pos: "MF", rating: 71 },
    { name: "David Wotherspoon", pos: "MF", rating: 69 },
    { name: "Jonathan David", pos: "FW", rating: 82 },
    { name: "Cyle Larin", pos: "FW", rating: 77 },
    { name: "Tajon Buchanan", pos: "FW", rating: 76 },
    { name: "Jacob Shaffelburg", pos: "FW", rating: 74 },
    { name: "Liam Millar", pos: "FW", rating: 73 },
    { name: "Iké Ugbo", pos: "FW", rating: 72 },
    { name: "Theo Bair", pos: "FW", rating: 71 },
    { name: "Junior Hoilett", pos: "FW", rating: 70 },
    { name: "Jacen Russell-Rowe", pos: "FW", rating: 70 }
  ],
  Mexico: [
    { name: "Luis Malagón", pos: "GK", rating: 76 },
    { name: "Guillermo Ochoa", pos: "GK", rating: 75 },
    { name: "Julio González", pos: "GK", rating: 72 },
    { name: "Edson Álvarez", pos: "DF", rating: 81 },
    { name: "César Montes", pos: "DF", rating: 77 },
    { name: "Johan Vásquez", pos: "DF", rating: 77 },
    { name: "Gerardo Arteaga", pos: "DF", rating: 75 },
    { name: "Jorge Sánchez", pos: "DF", rating: 74 },
    { name: "Jesús Gallardo", pos: "DF", rating: 74 },
    { name: "Israel Reyes", pos: "DF", rating: 73 },
    { name: "Bryan González", pos: "DF", rating: 71 },
    { name: "Luis Chávez", pos: "MF", rating: 78 },
    { name: "Luis Romo", pos: "MF", rating: 76 },
    { name: "Orbelín Pineda", pos: "MF", rating: 76 },
    { name: "Roberto Alvarado", pos: "MF", rating: 76 },
    { name: "Érick Sánchez", pos: "MF", rating: 75 },
    { name: "Carlos Rodríguez", pos: "MF", rating: 74 },
    { name: "Jordi Cortizo", pos: "MF", rating: 73 },
    { name: "Santiago Giménez", pos: "FW", rating: 81 },
    { name: "Hirving Lozano", pos: "FW", rating: 79 },
    { name: "Julián Quiñones", pos: "FW", rating: 78 },
    { name: "Henry Martín", pos: "FW", rating: 77 },
    { name: "Uriel Antuna", pos: "FW", rating: 76 },
    { name: "Alexis Vega", pos: "FW", rating: 75 },
    { name: "César Huerta", pos: "FW", rating: 74 },
    { name: "Guillermo Martínez", pos: "FW", rating: 72 }
  ],
  Argentina: [
    { name: "Emiliano Martínez", pos: "GK", rating: 85 },
    { name: "Gerónimo Rulli", pos: "GK", rating: 78 },
    { name: "Franco Armani", pos: "GK", rating: 75 },
    { name: "Cristian Romero", pos: "DF", rating: 86 },
    { name: "Lisandro Martínez", pos: "DF", rating: 84 },
    { name: "Nicolás Otamendi", pos: "DF", rating: 81 },
    { name: "Nahuel Molina", pos: "DF", rating: 79 },
    { name: "Nicolás Tagliafico", pos: "DF", rating: 79 },
    { name: "Marcos Acuña", pos: "DF", rating: 78 },
    { name: "Gonzalo Montiel", pos: "DF", rating: 77 },
    { name: "Germán Pezzella", pos: "DF", rating: 76 },
    { name: "Alexis Mac Allister", pos: "MF", rating: 85 },
    { name: "Rodrigo De Paul", pos: "MF", rating: 84 },
    { name: "Enzo Fernández", pos: "MF", rating: 83 },
    { name: "Giovani Lo Celso", pos: "MF", rating: 81 },
    { name: "Exequiel Palacios", pos: "MF", rating: 81 },
    { name: "Leandro Paredes", pos: "MF", rating: 80 },
    { name: "Guido Rodríguez", pos: "MF", rating: 78 },
    { name: "Lionel Messi", pos: "FW", rating: 88 },
    { name: "Lautaro Martínez", pos: "FW", rating: 87 },
    { name: "Julián Álvarez", pos: "FW", rating: 84 },
    { name: "Ángel Di María", pos: "FW", rating: 82 },
    { name: "Alejandro Garnacho", pos: "FW", rating: 80 },
    { name: "Nicolas González", pos: "FW", rating: 79 },
    { name: "Ángel Correa", pos: "FW", rating: 79 },
    { name: "Valentín Carboni", pos: "FW", rating: 74 }
  ],
  Brazil: [
    { name: "Alisson Becker", pos: "GK", rating: 87 },
    { name: "Ederson Moraes", pos: "GK", rating: 86 },
    { name: "Bento", pos: "GK", rating: 78 },
    { name: "Marquinhos", pos: "DF", rating: 85 },
    { name: "Gabriel Magalhães", pos: "DF", rating: 84 },
    { name: "Éder Militão", pos: "DF", rating: 83 },
    { name: "Bremer", pos: "DF", rating: 82 },
    { name: "Danilo", pos: "DF", rating: 78 },
    { name: "Guilherme Arana", pos: "DF", rating: 77 },
    { name: "Yan Couto", pos: "DF", rating: 76 },
    { name: "Beraldo", pos: "DF", rating: 75 },
    { name: "Bruno Guimarães", pos: "MF", rating: 84 },
    { name: "Lucas Paquetá", pos: "MF", rating: 82 },
    { name: "Douglas Luiz", pos: "MF", rating: 81 },
    { name: "Andreas Pereira", pos: "MF", rating: 79 },
    { name: "João Gomes", pos: "MF", rating: 78 },
    { name: "Éderson (MF)", pos: "MF", rating: 78 },
    { name: "Vinícius Júnior", pos: "FW", rating: 89 },
    { name: "Rodrygo Goes", pos: "FW", rating: 85 },
    { name: "Neymar Jr", pos: "FW", rating: 85 },
    { name: "Raphinha", pos: "FW", rating: 82 },
    { name: "Gabriel Martinelli", pos: "FW", rating: 81 },
    { name: "Endrick", pos: "FW", rating: 80 },
    { name: "Savinho", pos: "FW", rating: 79 },
    { name: "Evanilson", pos: "FW", rating: 77 },
    { name: "Pepê", pos: "FW", rating: 76 }
  ],
  France: [
    { name: "Mike Maignan", pos: "GK", rating: 86 },
    { name: "Brice Samba", pos: "GK", rating: 79 },
    { name: "Alphonse Areola", pos: "GK", rating: 78 },
    { name: "William Saliba", pos: "DF", rating: 87 },
    { name: "Theo Hernández", pos: "DF", rating: 84 },
    { name: "Jules Koundé", pos: "DF", rating: 83 },
    { name: "Ibrahima Konaté", pos: "DF", rating: 83 },
    { name: "Dayot Upamecano", pos: "DF", rating: 82 },
    { name: "Ferland Mendy", pos: "DF", rating: 80 },
    { name: "Benjamin Pavard", pos: "DF", rating: 80 },
    { name: "Jonathan Clauss", pos: "DF", rating: 78 },
    { name: "Antoine Griezmann", pos: "MF", rating: 85 },
    { name: "Aurélien Tchouaméni", pos: "MF", rating: 84 },
    { name: "Eduardo Camavinga", pos: "MF", rating: 83 },
    { name: "Adrien Rabiot", pos: "MF", rating: 82 },
    { name: "N'Golo Kanté", pos: "MF", rating: 81 },
    { name: "Warren Zaïre-Emery", pos: "MF", rating: 80 },
    { name: "Youssouf Fofana", pos: "MF", rating: 79 },
    { name: "Kylian Mbappé", pos: "FW", rating: 91 },
    { name: "Ousmane Dembélé", pos: "FW", rating: 84 },
    { name: "Marcus Thuram", pos: "FW", rating: 82 },
    { name: "Kingsley Coman", pos: "FW", rating: 81 },
    { name: "Bradley Barcola", pos: "FW", rating: 80 },
    { name: "Moussa Diaby", pos: "FW", rating: 80 },
    { name: "Randal Kolo Muani", pos: "FW", rating: 79 },
    { name: "Olivier Giroud", pos: "FW", rating: 79 }
  ],
  England: [
    { name: "Jordan Pickford", pos: "GK", rating: 83 },
    { name: "Aaron Ramsdale", pos: "GK", rating: 79 },
    { name: "Dean Henderson", pos: "GK", rating: 77 },
    { name: "Declan Rice", pos: "MF", rating: 86 },
    { name: "Jude Bellingham", pos: "MF", rating: 90 },
    { name: "John Stones", pos: "DF", rating: 84 },
    { name: "Kyle Walker", pos: "DF", rating: 83 },
    { name: "Marc Guéhi", pos: "DF", rating: 81 },
    { name: "Luke Shaw", pos: "DF", rating: 80 },
    { name: "Kieran Trippier", pos: "DF", rating: 80 },
    { name: "Harry Maguire", pos: "DF", rating: 79 },
    { name: "Ezri Konsa", pos: "DF", rating: 79 },
    { name: "Joe Gomez", pos: "DF", rating: 78 },
    { name: "Cole Palmer", pos: "MF", rating: 85 },
    { name: "Trent Alexander-Arnold", pos: "MF", rating: 84 },
    { name: "Conor Gallagher", pos: "MF", rating: 80 },
    { name: "Kobbie Mainoo", pos: "MF", rating: 79 },
    { name: "Adam Wharton", pos: "MF", rating: 74 },
    { name: "Harry Kane", pos: "FW", rating: 89 },
    { name: "Phil Foden", pos: "FW", rating: 88 },
    { name: "Bukayo Saka", pos: "FW", rating: 87 },
    { name: "Ollie Watkins", pos: "FW", rating: 82 },
    { name: "Jarrod Bowen", pos: "FW", rating: 81 },
    { name: "Eberechi Eze", pos: "FW", rating: 81 },
    { name: "Anthony Gordon", pos: "FW", rating: 81 },
    { name: "Ivan Toney", pos: "FW", rating: 80 }
  ],
  Germany: [
    { name: "Marc-André ter Stegen", pos: "GK", rating: 85 },
    { name: "Manuel Neuer", pos: "GK", rating: 84 },
    { name: "Oliver Baumann", pos: "GK", rating: 78 },
    { name: "Antonio Rüdiger", pos: "DF", rating: 86 },
    { name: "Joshua Kimmich", pos: "DF", rating: 85 },
    { name: "Jonathan Tah", pos: "DF", rating: 83 },
    { name: "Nico Schlotterbeck", pos: "DF", rating: 81 },
    { name: "Waldemar Anton", pos: "DF", rating: 79 },
    { name: "David Raum", pos: "DF", rating: 78 },
    { name: "Maximilian Mittelstädt", pos: "DF", rating: 78 },
    { name: "Benjamin Henrichs", pos: "DF", rating: 77 },
    { name: "Jamal Musiala", pos: "MF", rating: 87 },
    { name: "Florian Wirtz", pos: "MF", rating: 87 },
    { name: "İlkay Gündoğan", pos: "MF", rating: 83 },
    { name: "Pascal Groß", pos: "MF", rating: 80 },
    { name: "Robert Andrich", pos: "MF", rating: 79 },
    { name: "Aleksandar Pavlović", pos: "MF", rating: 77 },
    { name: "Kai Havertz", pos: "FW", rating: 83 },
    { name: "Leroy Sané", pos: "FW", rating: 83 },
    { name: "Niclas Füllkrug", pos: "FW", rating: 81 },
    { name: "Thomas Müller", pos: "FW", rating: 80 },
    { name: "Deniz Undav", pos: "FW", rating: 80 },
    { name: "Serge Gnabry", pos: "FW", rating: 80 },
    { name: "Jonas Hofmann", pos: "FW", rating: 78 },
    { name: "Chris Führich", pos: "MF", rating: 77 },
    { name: "Maximilian Beier", pos: "FW", rating: 76 }
  ],
  Spain: [
    { name: "Unai Simón", pos: "GK", rating: 84 },
    { name: "David Raya", pos: "GK", rating: 81 },
    { name: "Álex Remiro", pos: "GK", rating: 78 },
    { name: "Dani Carvajal", pos: "DF", rating: 85 },
    { name: "Alejandro Grimaldo", pos: "DF", rating: 83 },
    { name: "Aymeric Laporte", pos: "DF", rating: 82 },
    { name: "Robin Le Normand", pos: "DF", rating: 81 },
    { name: "Marc Cucurella", pos: "DF", rating: 80 },
    { name: "Dani Vivian", pos: "DF", rating: 79 },
    { name: "Nacho Fernández", pos: "DF", rating: 78 },
    { name: "Jesús Navas", pos: "DF", rating: 75 },
    { name: "Rodri", pos: "MF", rating: 90 },
    { name: "Pedri", pos: "MF", rating: 85 },
    { name: "Dani Olmo", pos: "MF", rating: 84 },
    { name: "Fabián Ruiz", pos: "MF", rating: 82 },
    { name: "Martin Zubimendi", pos: "MF", rating: 81 },
    { name: "Mikel Merino", pos: "MF", rating: 80 },
    { name: "Fermín López", pos: "MF", rating: 78 },
    { name: "Álex Baena", pos: "MF", rating: 79 },
    { name: "Lamine Yamal", pos: "FW", rating: 86 },
    { name: "Nico Williams", pos: "FW", rating: 84 },
    { name: "Álvaro Morata", pos: "FW", rating: 82 },
    { name: "Mikel Oyarzabal", pos: "FW", rating: 81 },
    { name: "Ferran Torres", pos: "FW", rating: 79 },
    { name: "Joselu", pos: "FW", rating: 78 },
    { name: "Ayoze Pérez", pos: "FW", rating: 77 }
  ]
};

// ==========================================
// 2. NAME GENERATORS FOR REMAINING 39 SQUADS
// ==========================================

const FIRST_NAMES_BY_REGION = {
  latin: ["Mateo", "Santiago", "Matias", "Lucas", "Sebastian", "Gabriel", "Tomas", "Felipe", "Nicolas", "Diego", "Luis", "Carlos", "Jose", "Javier", "Manuel", "Alejandro"],
  italy: ["Francesco", "Alessandro", "Giovanni", "Roberto", "Lorenzo", "Leonardo", "Mattia", "Gabriele", "Andrea", "Riccardo", "Tommaso", "Filippo", "Marco", "Giuseppe"],
  portugal: ["João", "Pedro", "Bruno", "Luís", "Diogo", "Tiago", "Rui", "Nuno", "Francisco", "Afonso", "Gonçalo", "Miguel", "Ricardo", "Manuel", "José", "Carlos"],
  middleEast: ["Salem", "Mohammed", "Abdullah", "Yasser", "Ali", "Hassan", "Ahmed", "Fahad", "Sultan", "Abdulrahman", "Saud", "Omar", "Khaled", "Youssef", "Ibrahim"],
  africa: ["Sadio", "Kalidou", "Idrissa", "Cheikhou", "Victor", "Alex", "Samuel", "Didier", "Emmanuel", "Eric", "Pierre", "Joseph", "Koffi", "Moussa", "Amadou", "Hakim"],
  europe: ["Thomas", "Martin", "Jan", "Jakub", "Robert", "Lukas", "David", "Christian", "Andreas", "Daniel", "Michael", "Stefan", "Peter", "Hans", "Nils", "Ivan"],
  generic: ["Alex", "John", "David", "Chris", "Ryan", "Michael", "James", "Daniel", "Sam", "Ben", "Tom", "Oliver", "Harry", "Jack", "William", "George"]
};

const LAST_NAMES_BY_REGION = {
  latin: ["Rodriguez", "Gonzalez", "Gomez", "Fernandez", "Silva", "Lopez", "Martinez", "Perez", "Sanchez", "Ramirez", "Torres", "Diaz", "Castro", "Vargas", "Morales"],
  italy: ["Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco", "Bruno", "Gallo", "Conti", "De Luca", "Costa"],
  portugal: ["Silva", "Santos", "Ferreira", "Costa", "Pereira", "Oliveira", "Gomes", "Pinto", "Rodrigues", "Neves", "Sousa", "Dias", "Martins", "Carvalho"],
  middleEast: ["Al-Dawsari", "Al-Shahrani", "Al-Faraj", "Al-Muwallad", "Al-Shehri", "Al-Harbi", "Al-Ghamdi", "Al-Otaibi", "Al-Dosari", "Al-Qahtani", "Al-Yami"],
  africa: ["Mané", "Koulibaly", "Gueye", "Kouyate", "Diallo", "Diarra", "Traore", "Sow", "Mensah", "Gyan", "Osei", "Toure", "Zaha", "Keita", "Ndidi"],
  europe: ["Müller", "Schmidt", "Hansen", "Nilsson", "Novak", "Kowalski", "Zieliński", "Weber", "Larsen", "Svensson", "Petrov", "Gruber", "Brunner", "Melnyk"],
  generic: ["Smith", "Jones", "Taylor", "Brown", "Wilson", "Johnson", "Davies", "Williams", "Miller", "Davis", "Anderson", "White", "Thompson", "Clark"]
};

function getRegionForTeam(code) {
  if (["COL", "ECU", "PAN", "JAM", "CRC", "URU", "PER", "CHI"].includes(code)) return "latin";
  if (code === "ITA") return "italy";
  if (code === "POR") return "portugal";
  if (["EGY", "TUN", "MAR", "IRQ", "KSA", "IRN", "QAT"].includes(code)) return "middleEast";
  if (["CMR", "NGA", "ALG", "SEN", "GHA", "RSA"].includes(code)) return "africa";
  if (["POL", "DEN", "GER", "CRO", "SRB", "UKR", "AUT", "SWE", "SUI", "WAL", "SCO"].includes(code)) return "europe";
  return "generic";
}

function generateSquad(teamCode, teamRating) {
  const squad = [];
  const region = getRegionForTeam(teamCode);
  const firstNames = FIRST_NAMES_BY_REGION[region];
  const lastNames = LAST_NAMES_BY_REGION[region];
  
  // Roster size 26 (3 GK, 8 DF, 8 MF, 7 FW)
  const positions = [
    { pos: "GK", count: 3 },
    { pos: "DF", count: 8 },
    { pos: "MF", count: 8 },
    { pos: "FW", count: 7 }
  ];

  let playerNum = 1;
  positions.forEach(p => {
    for (let i = 0; i < p.count; i++) {
      const fIdx = Math.floor(Math.random() * firstNames.length);
      const lIdx = Math.floor(Math.random() * lastNames.length);
      const name = firstNames[fIdx] + " " + lastNames[lIdx];
      
      // Random rating variation centered around team base rating
      const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
      const rating = Math.max(62, Math.min(92, teamRating + delta));
      
      squad.push({
        name: name,
        pos: p.pos,
        rating: rating
      });
      playerNum++;
    }
  });

  return squad;
}

// Global active tournament state
const STATE = {
  teams: [],      // Complete array of teams with standings
  players: [],    // Flat array of all players
  fixtures: [],   // Match schedule
  matchesPlayed: 0,
  goalsScored: 0,
  yellowCards: 0,
  redCards: 0,
  currentMatchIndex: 0,
  currentTab: "overview",
  currentPhase: "group", // group, r32, r16, qf, sf, final, completed
  groupFilter: "all",
  fixtureFilter: "all",
  selectedSquadTeam: "USA",
  squadSortKey: "rating",
  squadSortDesc: true,
  searchQuery: ""
};

// ==========================================
// 3. INITIALIZATION & SCHEDULE GENERATION
// ==========================================

function initData() {
  // 1. Setup Teams and programmatically populate rosters
  TEAMS_DATA.forEach(t => {
    const team = {
      ...t,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      qualified: false,
      eliminated: false
    };
    STATE.teams.push(team);

    // Get or generate squad players
    let players = REAL_SQUADS[t.code];
    if (!players) {
      players = generateSquad(t.code, t.rating);
    }
    
    // Add players to global flat database with clean stats
    players.forEach(p => {
      STATE.players.push({
        ...p,
        teamCode: t.code,
        teamName: t.name,
        teamFlag: t.flag,
        goals: 0,
        assists: 0,
        yellow: 0,
        red: 0,
        cleansheets: 0,
        matchesPlayed: 0
      });
    });
  });

  // 2. Pre-generate Group Stage schedule (72 matches)
  // Round-robin per group: 12 groups A to L.
  // We stagger matches so all Group A, then Group B etc. are not played sequentially, but spread rounds.
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  
  // Build rounds of group matches
  const round1 = [];
  const round2 = [];
  const round3 = [];

  groups.forEach(g => {
    const grpTeams = STATE.teams.filter(t => t.group === g);
    
    // Day/Round 1: Team 1 vs 2, Team 3 vs 4
    round1.push(createFixture(grpTeams[0], grpTeams[1], "Group Stage", g));
    round1.push(createFixture(grpTeams[2], grpTeams[3], "Group Stage", g));

    // Day/Round 2: Team 1 vs 3, Team 2 vs 4
    round2.push(createFixture(grpTeams[0], grpTeams[2], "Group Stage", g));
    round2.push(createFixture(grpTeams[1], grpTeams[3], "Group Stage", g));

    // Day/Round 3: Team 4 vs 1, Team 2 vs 3
    round3.push(createFixture(grpTeams[3], grpTeams[0], "Group Stage", g));
    round3.push(createFixture(grpTeams[1], grpTeams[2], "Group Stage", g));
  });

  // Concatenate fixtures list (staggered group stages)
  STATE.fixtures = [...round1, ...round2, ...round3];
}

let fixtureIdCounter = 1;
function createFixture(homeTeam, awayTeam, phase, groupName = "") {
  // Randomly assign one of the host venues
  const venueIdx = Math.floor(Math.random() * VENUES.length);
  const venue = VENUES[venueIdx];
  
  return {
    id: fixtureIdCounter++,
    homeTeam: homeTeam.name,
    homeCode: homeTeam.code,
    homeFlag: homeTeam.flag,
    homeRating: homeTeam.rating,
    awayTeam: awayTeam.name,
    awayCode: awayTeam.code,
    awayFlag: awayTeam.flag,
    awayRating: awayTeam.rating,
    phase: phase,
    group: groupName,
    venue: venue.stadium + " (" + venue.city + ")",
    venueCountry: venue.country,
    completed: false,
    homeScore: 0,
    awayScore: 0,
    events: [], // timeline events: goals, cards
    date: getRandomMatchDate(phase)
  };
}

function getRandomMatchDate(phase) {
  if (phase === "Group Stage") {
    const days = ["June 11", "June 12", "June 13", "June 14", "June 15", "June 16", "June 17", "June 18", "June 19", "June 20", "June 21", "June 22", "June 23", "June 24", "June 25", "June 26", "June 27"];
    return days[Math.floor(Math.random() * days.length)] + ", 2026";
  }
  if (phase === "Round of 32") return "June 29 - July 3, 2026";
  if (phase === "Round of 16") return "July 4 - July 7, 2026";
  if (phase === "Quarter-finals") return "July 9 - July 11, 2026";
  if (phase === "Semi-finals") return "July 14 - July 15, 2026";
  if (phase === "Third Place Match") return "July 18, 2026";
  if (phase === "Final") return "July 19, 2026";
  return "June 2026";
}

// ==========================================
// 4. MATCH SIMULATION ENGINE
// ==========================================

function simulateMatchScores(homeOvr, awayOvr, isKnockout = false) {
  // Base expectation: 1.35 goals per team, scaled by rating difference
  const diff = homeOvr - awayOvr;
  
  // Calculate lambda (average rate of goals) for each team
  // Maximum rating difference usually +/- 20 points
  const homeLambda = Math.max(0.2, 1.3 + (diff * 0.08));
  const awayLambda = Math.max(0.2, 1.3 - (diff * 0.08));
  
  // Poisson random variable generator
  function poissonRandom(lambda) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    do {
      k++;
      p *= Math.random();
    } while (p > L && k < 12);
    return k - 1;
  }
  
  let homeScore = poissonRandom(homeLambda);
  let awayScore = poissonRandom(awayOvr < 70 ? awayLambda : awayLambda + 0.1); // slight boost for balance

  // Resolve knockout ties
  let extraTime = false;
  let penaltyWinner = null;
  let penHomeScore = 0;
  let penAwayScore = 0;

  if (isKnockout && homeScore === awayScore) {
    // 30% chance match was decided in Extra Time, 70% in Penalty Shootout
    if (Math.random() < 0.3) {
      extraTime = true;
      const extraHome = poissonRandom(homeLambda * 0.3);
      const extraAway = poissonRandom(awayLambda * 0.3);
      homeScore += extraHome;
      awayScore += extraAway;
    }
    
    // If still tied, trigger penalties
    if (homeScore === awayScore) {
      extraTime = true;
      // Simulate shootout: standard best of 5, then sudden death
      let hPens = 0;
      let aPens = 0;
      // Simplistic shootout: home team converts with 75% rate, away converts with 75% rate (slight shift by rating)
      const hRate = 0.75 + (diff * 0.005);
      const aRate = 0.75 - (diff * 0.005);
      
      // Best of 5
      for (let r = 0; r < 5; r++) {
        if (Math.random() < hRate) hPens++;
        if (Math.random() < aRate) aPens++;
      }
      
      // Sudden death
      while (hPens === aPens) {
        if (Math.random() < hRate) hPens++;
        if (Math.random() < aRate) aPens++;
      }
      
      penHomeScore = hPens;
      penAwayScore = aPens;
      penaltyWinner = hPens > aPens ? "home" : "away";
    }
  }

  return {
    homeScore,
    awayScore,
    extraTime,
    penaltyWinner,
    penHomeScore,
    penAwayScore
  };
}

function generateMatchEvents(fixture, simulationResult) {
  const events = [];
  const homePlayers = STATE.players.filter(p => p.teamCode === fixture.homeCode);
  const awayPlayers = STATE.players.filter(p => p.teamCode === fixture.awayCode);
  
  const { homeScore, awayScore, extraTime } = simulationResult;
  const matchDuration = extraTime ? 120 : 90;

  // 1. Process Home Goals
  for (let i = 0; i < homeScore; i++) {
    const min = Math.floor(Math.random() * matchDuration) + 1;
    const scorer = pickWeightedPlayer(homePlayers, ["FW", "MF", "DF"]);
    const assistRoll = Math.random();
    let assister = null;
    if (assistRoll < 0.65) { // 65% of goals are assisted
      // Filter out scorer
      const possibleAssisters = homePlayers.filter(p => p.name !== scorer.name);
      assister = pickWeightedPlayer(possibleAssisters, ["MF", "FW", "DF"]);
    }
    
    events.push({
      type: "goal",
      team: "home",
      teamName: fixture.homeTeam,
      flag: fixture.homeFlag,
      minute: min,
      playerName: scorer.name,
      playerPos: scorer.pos,
      assistName: assister ? assister.name : null
    });
  }

  // 2. Process Away Goals
  for (let i = 0; i < awayScore; i++) {
    const min = Math.floor(Math.random() * matchDuration) + 1;
    const scorer = pickWeightedPlayer(awayPlayers, ["FW", "MF", "DF"]);
    const assistRoll = Math.random();
    let assister = null;
    if (assistRoll < 0.65) {
      const possibleAssisters = awayPlayers.filter(p => p.name !== scorer.name);
      assister = pickWeightedPlayer(possibleAssisters, ["MF", "FW", "DF"]);
    }
    
    events.push({
      type: "goal",
      team: "away",
      teamName: fixture.awayTeam,
      flag: fixture.awayFlag,
      minute: min,
      playerName: scorer.name,
      playerPos: scorer.pos,
      assistName: assister ? assister.name : null
    });
  }

  // 3. Process Cards (Random Yellows/Reds)
  // Average cards per match: 3.5 yellow, 0.15 red
  const cardCount = Math.floor(Math.random() * 5); // 0 to 4 cards
  for (let i = 0; i < cardCount; i++) {
    const min = Math.floor(Math.random() * matchDuration) + 1;
    const isHome = Math.random() < 0.5;
    const squad = isHome ? homePlayers : awayPlayers;
    const player = pickWeightedPlayer(squad, ["DF", "MF", "FW"], true); // defenders/midfielders get more cards
    const cardType = Math.random() < 0.05 ? "red" : "yellow"; // 5% red card rate

    events.push({
      type: cardType,
      team: isHome ? "home" : "away",
      teamName: isHome ? fixture.homeTeam : fixture.awayTeam,
      flag: isHome ? fixture.homeFlag : fixture.awayFlag,
      minute: min,
      playerName: player.name
    });
  }

  // Sort events chronologically
  events.sort((a, b) => a.minute - b.minute);

  // Add shootout details to event logs if penalty shootout occurred
  if (simulationResult.penaltyWinner) {
    events.push({
      type: "shootout",
      minute: 120,
      winner: simulationResult.penaltyWinner,
      homeScore: simulationResult.penHomeScore,
      awayScore: simulationResult.penAwayScore,
      desc: `Penalty Shootout: ${fixture.homeTeam} (${simulationResult.penHomeScore}) - (${simulationResult.penAwayScore}) ${fixture.awayTeam}. Winner: ${simulationResult.penaltyWinner === "home" ? fixture.homeTeam : fixture.awayTeam}.`
    });
  }

  return events;
}

// Weighted selection helper based on ratings & positions
function pickWeightedPlayer(players, posPriority, cards = false) {
  // If no players, return fallback object
  if (!players || players.length === 0) return { name: "Unknown Player", pos: "FW", rating: 70 };
  
  const weights = players.map(p => {
    // Base weight is overall rating
    let w = p.rating;
    
    // Position weight shifts
    if (cards) {
      // Cards: DF gets 3x weight, MF 2x, FW 1x, GK 0.2x
      if (p.pos === "DF") w *= 3.0;
      else if (p.pos === "MF") w *= 2.0;
      else if (p.pos === "FW") w *= 0.8;
      else if (p.pos === "GK") w *= 0.15;
    } else {
      // Goals/Assists: FW gets 4x weight, MF 2.5x, DF 0.8x, GK 0.01x
      if (p.pos === "FW") w *= 4.0;
      else if (p.pos === "MF") w *= 2.5;
      else if (p.pos === "DF") w *= 0.6;
      else if (p.pos === "GK") w *= 0.01;
    }
    return w;
  });

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * totalWeight;
  
  for (let i = 0; i < players.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return players[i];
  }
  return players[players.length - 1];
}

// ==========================================
// 5. LIVE ANIMATION TIMER & STANDINGS MUTATOR
// ==========================================

function playLiveSimulation(fixtureId, onCompleteCallback) {
  const fixture = STATE.fixtures.find(f => f.id === fixtureId);
  if (!fixture || fixture.completed) return;

  // Determine if it is a knockout match
  const isKnockout = fixture.group === "";

  // 1. Run simulation scores
  const simResult = simulateMatchScores(fixture.homeRating, fixture.awayRating, isKnockout);
  const events = generateMatchEvents(fixture, simResult);

  // Set match details in STATE temporarily or write to fixture
  fixture.homeScore = simResult.homeScore;
  fixture.awayScore = simResult.awayScore;
  fixture.events = events;
  fixture.extraTime = simResult.extraTime;
  fixture.penaltyWinner = simResult.penaltyWinner;
  fixture.penHomeScore = simResult.penHomeScore;
  fixture.penAwayScore = simResult.penAwayScore;
  
  // 2. Open Modal & Setup Scoreboard
  const modal = document.getElementById("simulation-modal");
  modal.classList.add("active");

  document.getElementById("modal-team-home-name").innerText = fixture.homeTeam;
  document.getElementById("modal-team-home-flag").innerText = fixture.homeFlag;
  document.getElementById("modal-team-home-rating").innerText = `OVR ${fixture.homeRating}`;
  
  document.getElementById("modal-team-away-name").innerText = fixture.awayTeam;
  document.getElementById("modal-team-away-flag").innerText = fixture.awayFlag;
  document.getElementById("modal-team-away-rating").innerText = `OVR ${fixture.awayRating}`;

  document.getElementById("modal-score-digits").innerText = "0 - 0";
  const timerBadge = document.getElementById("modal-timer-badge");
  timerBadge.innerText = "0'";
  timerBadge.classList.remove("completed");

  const ticker = document.getElementById("modal-events-ticker");
  ticker.innerHTML = `
    <div class="timeline-event-item" style="color: var(--text-muted);">
      <span class="timeline-minute">0'</span>
      <span class="timeline-icon"><i class="fa-solid fa-whistle"></i></span>
      <span class="timeline-desc">The referee blows the whistle. Kick-off at ${fixture.venue}!</span>
    </div>
  `;

  // Update standings shift container
  const standingsBlock = document.getElementById("modal-standings-updates-block");
  const standingsTitle = document.getElementById("modal-standings-updates-title");
  
  if (isKnockout) {
    standingsBlock.style.display = "none";
  } else {
    standingsBlock.style.display = "block";
    standingsTitle.innerText = `Group ${fixture.group} Standings Preview`;
    updateModalStandingsPreview(fixture, 0, 0);
  }

  // 3. Ticker Interval Loop (0 to 90 or 120 minutes)
  let currentMinute = 0;
  const matchDuration = simResult.extraTime ? 120 : 90;
  
  // Disable close button and done button during live play
  const doneBtn = document.getElementById("modal-action-btn");
  const closeBtn = document.getElementById("modal-close-btn");
  doneBtn.disabled = true;
  doneBtn.innerText = "Simulating...";
  closeBtn.style.display = "none";

  let runningHomeScore = 0;
  let runningAwayScore = 0;

  const intervalSpeed = 40; // 40ms per minute (3.6 seconds total)
  
  const simInterval = setInterval(() => {
    currentMinute++;
    timerBadge.innerText = `${currentMinute}'`;
    
    // Pick events happening in this minute
    const minuteEvents = events.filter(e => e.minute === currentMinute);
    minuteEvents.forEach(evt => {
      let eventIcon = "";
      let eventDesc = "";
      
      if (evt.type === "goal") {
        if (evt.team === "home") runningHomeScore++;
        else runningAwayScore++;
        
        // Update score display
        document.getElementById("modal-score-digits").innerText = `${runningHomeScore} - ${runningAwayScore}`;
        
        // Update standings shifts real-time!
        if (!isKnockout) {
          updateModalStandingsPreview(fixture, runningHomeScore, runningAwayScore);
        }

        eventIcon = `<i class="fa-solid fa-soccer-ball timeline-icon goal"></i>`;
        eventDesc = `<strong>GOAL!</strong> ${evt.flag} ${evt.playerName} (${evt.playerPos}) scores.`;
        if (evt.assistName) {
          eventDesc += ` <span class="timeline-assist">Assisted by ${evt.assistName}.</span>`;
        }
      } else if (evt.type === "yellow") {
        eventIcon = `<i class="fa-solid fa-square timeline-icon" style="color: var(--warning);"></i>`;
        eventDesc = `Yellow card awarded to ${evt.playerName} (${evt.teamName}).`;
      } else if (evt.type === "red") {
        eventIcon = `<i class="fa-solid fa-square timeline-icon" style="color: var(--danger);"></i>`;
        eventDesc = `<strong>RED CARD!</strong> ${evt.playerName} is sent off.`;
      } else if (evt.type === "shootout") {
        eventIcon = `<i class="fa-solid fa-circle-notch timeline-icon" style="color: var(--gold-primary);"></i>`;
        eventDesc = evt.desc;
      }

      const eventEl = document.createElement("div");
      eventEl.className = "timeline-event-item";
      eventEl.innerHTML = `
        <span class="timeline-minute">${evt.minute}'</span>
        <span class="timeline-icon">${eventIcon}</span>
        <span class="timeline-desc">${eventDesc}</span>
      `;
      ticker.appendChild(eventEl);
      ticker.scrollTop = ticker.scrollHeight;
    });

    if (currentMinute >= matchDuration) {
      clearInterval(simInterval);
      
      // End Match Ceremony
      timerBadge.innerText = simResult.extraTime ? "AET" : "FT";
      timerBadge.classList.add("completed");
      
      // If penalty shootout happened and not yet displayed, append final shootout line
      const shootoutEvt = events.find(e => e.type === "shootout");
      if (shootoutEvt && !ticker.innerHTML.includes("Penalty Shootout")) {
        const eventEl = document.createElement("div");
        eventEl.className = "timeline-event-item";
        eventEl.innerHTML = `
          <span class="timeline-minute">120'</span>
          <span class="timeline-icon"><i class="fa-solid fa-circle-notch timeline-icon" style="color: var(--gold-primary);"></i></span>
          <span class="timeline-desc"><strong>Shootout:</strong> ${shootoutEvt.desc}</span>
        `;
        ticker.appendChild(eventEl);
        ticker.scrollTop = ticker.scrollHeight;
      }

      // Final whistle log
      const whistleEl = document.createElement("div");
      whistleEl.className = "timeline-event-item";
      whistleEl.style.color = "var(--success)";
      whistleEl.innerHTML = `
        <span class="timeline-minute">${matchDuration}'</span>
        <span class="timeline-icon"><i class="fa-solid fa-circle-check"></i></span>
        <span class="timeline-desc">Full-time whistle! Final score: ${fixture.homeTeam} ${fixture.homeScore} - ${fixture.awayScore} ${fixture.awayTeam}.</span>
      `;
      ticker.appendChild(whistleEl);
      ticker.scrollTop = ticker.scrollHeight;

      // Finalize database metrics & player states
      finalizeMatchStats(fixture, simResult);

      // Re-enable actions
      doneBtn.disabled = false;
      doneBtn.innerText = "Close Details";
      closeBtn.style.display = "block";

      if (onCompleteCallback) onCompleteCallback();
    }
  }, intervalSpeed);
}

// Live modal standings updates
function updateModalStandingsPreview(currentFixture, liveHomeScore, liveAwayScore) {
  // Create deep clone of current group standings
  const groupName = currentFixture.group;
  const groupTeams = STATE.teams.filter(t => t.group === groupName).map(t => ({ ...t }));
  
  // Find local home and away teams in clones
  const homeClone = groupTeams.find(t => t.code === currentFixture.homeCode);
  const awayClone = groupTeams.find(t => t.code === currentFixture.awayCode);

  // Apply hypothetical live score outcome
  homeClone.played += 1;
  awayClone.played += 1;
  homeClone.goalsFor += liveHomeScore;
  homeClone.goalsAgainst += liveAwayScore;
  awayClone.goalsFor += liveAwayScore;
  awayClone.goalsAgainst += liveHomeScore;
  
  homeClone.goalDifference = homeClone.goalsFor - homeClone.goalsAgainst;
  awayClone.goalDifference = awayClone.goalsFor - awayClone.goalsAgainst;

  if (liveHomeScore > liveAwayScore) {
    homeClone.points += 3;
    homeClone.won += 1;
    awayClone.lost += 1;
  } else if (liveHomeScore < liveAwayScore) {
    awayClone.points += 3;
    awayClone.won += 1;
    homeClone.lost += 1;
  } else {
    homeClone.points += 1;
    awayClone.points += 1;
    homeClone.drawn += 1;
    awayClone.drawn += 1;
  }

  // Sort group clone
  sortGroupStandings(groupTeams);

  // Render to modal table body
  const tbody = document.getElementById("modal-standings-tbody");
  tbody.innerHTML = "";

  groupTeams.forEach((t, index) => {
    const originalPos = getOriginalPositionInGroup(t.code, groupName);
    const newPos = index + 1;
    
    let movement = "";
    if (newPos < originalPos) {
      movement = `<span class="team-movement-up"><i class="fa-solid fa-caret-up"></i> ${originalPos - newPos}</span>`;
    } else if (newPos > originalPos) {
      movement = `<span class="team-movement-down"><i class="fa-solid fa-caret-down"></i> ${newPos - originalPos}</span>`;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="pos-num" style="padding-left: 0.5rem;">${newPos} ${movement}</td>
      <td class="table-team-cell">
        <span>${t.flag}</span>
        <strong>${t.name}</strong>
      </td>
      <td class="center-col">${t.played}</td>
      <td class="center-col">${t.goalDifference > 0 ? "+" + t.goalDifference : t.goalDifference}</td>
      <td class="center-col" style="font-weight: 700; color: var(--gold-primary);">${t.points}</td>
    `;
    tbody.appendChild(row);
  });
}

function getOriginalPositionInGroup(teamCode, groupName) {
  // Sort original group copy
  const groupTeams = STATE.teams.filter(t => t.group === groupName).map(t => ({ ...t }));
  sortGroupStandings(groupTeams);
  const idx = groupTeams.findIndex(t => t.code === teamCode);
  return idx === -1 ? 4 : idx + 1;
}

function sortGroupStandings(teamsList) {
  teamsList.sort((a, b) => {
    // 1. Points
    if (b.points !== a.points) return b.points - a.points;
    // 2. Goal Difference
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    // 3. Goals For
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    // 4. Base Rating (custom tie breaker)
    return b.rating - a.rating;
  });
}

// Finalize match and write results to persistent STATE
function finalizeMatchStats(fixture, simResult) {
  fixture.completed = true;
  STATE.matchesPlayed++;
  
  // Write score
  fixture.homeScore = simResult.homeScore;
  fixture.awayScore = simResult.awayScore;
  
  // Calculate goals/standings for Group Stage
  const isGroupStage = fixture.group !== "";
  
  if (isGroupStage) {
    const homeTeam = STATE.teams.find(t => t.code === fixture.homeCode);
    const awayTeam = STATE.teams.find(t => t.code === fixture.awayCode);

    homeTeam.played += 1;
    awayTeam.played += 1;
    homeTeam.goalsFor += simResult.homeScore;
    homeTeam.goalsAgainst += simResult.awayScore;
    awayTeam.goalsFor += simResult.awayScore;
    awayTeam.goalsAgainst += simResult.homeScore;
    
    homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;

    if (simResult.homeScore > simResult.awayScore) {
      homeTeam.points += 3;
      homeTeam.won += 1;
      awayTeam.lost += 1;
    } else if (simResult.homeScore < simResult.awayScore) {
      awayTeam.points += 3;
      awayTeam.won += 1;
      homeTeam.lost += 1;
    } else {
      homeTeam.points += 1;
      awayTeam.points += 1;
      homeTeam.drawn += 1;
      awayTeam.drawn += 1;
    }
  }

  // Update Global Tournament Metrics
  STATE.goalsScored += (simResult.homeScore + simResult.awayScore);

  // Write player specific goal scorers, assists, cards, cleansheets
  fixture.events.forEach(evt => {
    if (evt.type === "goal") {
      const pScorer = STATE.players.find(p => p.name === evt.playerName && p.teamCode === (evt.team === "home" ? fixture.homeCode : fixture.awayCode));
      if (pScorer) pScorer.goals++;
      
      if (evt.assistName) {
        const pAssister = STATE.players.find(p => p.name === evt.assistName && p.teamCode === (evt.team === "home" ? fixture.homeCode : fixture.awayCode));
        if (pAssister) pAssister.assists++;
      }
    } else if (evt.type === "yellow") {
      const pPlayer = STATE.players.find(p => p.name === evt.playerName && p.teamCode === (evt.team === "home" ? fixture.homeCode : fixture.awayCode));
      if (pPlayer) {
        pPlayer.yellow++;
        STATE.yellowCards++;
      }
    } else if (evt.type === "red") {
      const pPlayer = STATE.players.find(p => p.name === evt.playerName && p.teamCode === (evt.team === "home" ? fixture.homeCode : fixture.awayCode));
      if (pPlayer) {
        pPlayer.red++;
        STATE.redCards++;
      }
    }
  });

  // GKs Clean sheet updates
  if (simResult.homeScore === 0) {
    const awayGK = STATE.players.find(p => p.teamCode === fixture.awayCode && p.pos === "GK");
    if (awayGK) awayGK.cleansheets++;
  }
  if (simResult.awayScore === 0) {
    const homeGK = STATE.players.find(p => p.teamCode === fixture.homeCode && p.pos === "GK");
    if (homeGK) homeGK.cleansheets++;
  }

  // Increment appearances
  const homeSquad = STATE.players.filter(p => p.teamCode === fixture.homeCode);
  const awaySquad = STATE.players.filter(p => p.teamCode === fixture.awayCode);
  homeSquad.forEach(p => p.matchesPlayed++);
  awaySquad.forEach(p => p.matchesPlayed++);

  // Advance simulation calendar date details
  updateSimulationDate();
  
  // Sort teams again
  STATE.teams.forEach(t => {
    const grp = t.group;
    if (grp) {
      const grpTeams = STATE.teams.filter(team => team.group === grp);
      sortGroupStandings(grpTeams);
    }
  });
}

function updateSimulationDate() {
  const currentSimIdx = STATE.fixtures.filter(f => f.completed).length;
  let dateText = "June 11, 2026";
  
  if (STATE.currentPhase === "group") {
    // 72 matches in 17 days
    const day = Math.min(17, Math.floor(currentSimIdx / 4.2) + 11);
    dateText = `June ${day}, 2026`;
  } else if (STATE.currentPhase === "r32") {
    dateText = "July 1, 2026";
  } else if (STATE.currentPhase === "r16") {
    dateText = "July 5, 2026";
  } else if (STATE.currentPhase === "qf") {
    dateText = "July 10, 2026";
  } else if (STATE.currentPhase === "sf") {
    dateText = "July 14, 2026";
  } else if (STATE.currentPhase === "final") {
    dateText = "July 19, 2026";
  } else {
    dateText = "July 20, 2026 (Finished)";
  }
  
  document.getElementById("current-sim-date").innerText = dateText;
}

// ==========================================
// 6. KNOCKOUT STAGE GENERATION
// ==========================================

function checkAndGenerateNextPhase() {
  const completedCount = STATE.fixtures.filter(f => f.completed).length;
  
  if (STATE.currentPhase === "group" && completedCount === 72) {
    // Group Stage finished! Generate Round of 32
    generateRoundOf32();
  } else if (STATE.currentPhase === "r32" && completedCount === 72 + 16) {
    // R32 finished! Generate R16 (8 matches)
    generateKnockoutRound("Round of 16", 8, "r16");
  } else if (STATE.currentPhase === "r16" && completedCount === 72 + 16 + 8) {
    // R16 finished! Generate QF (4 matches)
    generateKnockoutRound("Quarter-finals", 4, "qf");
  } else if (STATE.currentPhase === "qf" && completedCount === 72 + 16 + 8 + 4) {
    // QF finished! Generate SF (2 matches)
    generateKnockoutRound("Semi-finals", 2, "sf");
  } else if (STATE.currentPhase === "sf" && completedCount === 72 + 16 + 8 + 4 + 2) {
    // SF finished! Generate Final & 3rd Place Match (2 matches)
    generateFinals();
  } else if (STATE.currentPhase === "final" && completedCount === 104) {
    // Tournament completed!
    STATE.currentPhase = "completed";
    announceWinner();
  }
  
  // Sync the phase selector values
  document.getElementById("tournament-phase-select").value = STATE.currentPhase;
}

function generateRoundOf32() {
  STATE.currentPhase = "r32";
  
  // 1. Gather all 1st and 2nd placed teams
  const groupWinners = []; // 12 teams
  const groupRunnersUp = []; // 12 teams
  const thirdPlaced = []; // 12 teams
  
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  
  groups.forEach(g => {
    const grpTeams = STATE.teams.filter(t => t.group === g).map(t => ({ ...t }));
    sortGroupStandings(grpTeams);
    
    // Map full details
    groupWinners.push(STATE.teams.find(t => t.code === grpTeams[0].code));
    groupRunnersUp.push(STATE.teams.find(t => t.code === grpTeams[1].code));
    thirdPlaced.push(STATE.teams.find(t => t.code === grpTeams[2].code));
  });

  // 2. Rank the 12 third-placed teams to find the top 8
  sortGroupStandings(thirdPlaced);
  const top8ThirdPlaced = thirdPlaced.slice(0, 8);
  const eliminatedThirdPlaced = thirdPlaced.slice(8);
  
  // Flag qualifying status on teams
  groupWinners.forEach(t => t.qualified = true);
  groupRunnersUp.forEach(t => t.qualified = true);
  top8ThirdPlaced.forEach(t => t.qualified = true);
  eliminatedThirdPlaced.forEach(t => t.eliminated = true);
  
  // Flag bottom teams as eliminated
  groups.forEach(g => {
    const grpTeams = STATE.teams.filter(t => t.group === g);
    sortGroupStandings(grpTeams);
    grpTeams[3].eliminated = true; // 4th place
  });

  // 3. Assemble 32 qualified teams
  // Combine teams and rank them 1 to 32 for pairings:
  // Rank Winners 1-12, Runners Up 13-24, 3rd Placed 25-32
  // We can sort winners by points/GD to seed them, etc.
  sortGroupStandings(groupWinners);
  sortGroupStandings(groupRunnersUp);
  
  const seedList = [...groupWinners, ...groupRunnersUp, ...top8ThirdPlaced];
  
  // Create 16 matches in Round of 32
  // Let's match:
  // - Top Winners (1-8) vs Top 3rd Placed (25-32)
  // - Bottom Winners (9-12) vs Bottom Runners Up (21-24)
  // - Top Runners Up (13-20) against each other
  const r32Fixtures = [];
  
  // Seeding pairs:
  // Match Winners 1-8 against Third Placed 1-8
  for (let i = 0; i < 8; i++) {
    r32Fixtures.push(createFixture(seedList[i], seedList[24 + i], "Round of 32"));
  }
  // Match Winners 9-12 against Runners Up 9-12
  for (let i = 0; i < 4; i++) {
    r32Fixtures.push(createFixture(seedList[8 + i], seedList[20 + i], "Round of 32"));
  }
  // Match Runners Up 1-8 against each other
  for (let i = 0; i < 4; i++) {
    r32Fixtures.push(createFixture(seedList[12 + i], seedList[16 + i], "Round of 32"));
  }

  // Push new fixtures to state schedule
  STATE.fixtures.push(...r32Fixtures);
  
  // Alert/Notification to user in top bar
  showTournamentAlert("Group stage completed! The Round of 32 matches have been generated.");
}

function generateKnockoutRound(phaseName, matchCount, statePhaseKey) {
  STATE.currentPhase = statePhaseKey;
  
  // Find winners of the previous round
  // Previous round matches are the last `matchCount * 2` matches in the schedule
  const totalFixtures = STATE.fixtures.length;
  const prevMatches = STATE.fixtures.slice(totalFixtures - (matchCount * 2));
  
  const winners = [];
  prevMatches.forEach(f => {
    let winningCode = "";
    if (f.homeScore > f.awayScore) winningCode = f.homeCode;
    else if (f.homeScore < f.awayScore) winningCode = f.awayCode;
    else {
      // Penalty decision
      winningCode = f.penaltyWinner === "home" ? f.homeCode : f.awayCode;
    }
    
    // Set loser as eliminated
    const losingCode = winningCode === f.homeCode ? f.awayCode : f.homeCode;
    const loser = STATE.teams.find(t => t.code === losingCode);
    if (loser) loser.eliminated = true;

    const winner = STATE.teams.find(t => t.code === winningCode);
    winners.push(winner);
  });

  // Match winners against each other
  const newFixtures = [];
  for (let i = 0; i < winners.length; i += 2) {
    newFixtures.push(createFixture(winners[i], winners[i+1], phaseName));
  }

  STATE.fixtures.push(...newFixtures);
  showTournamentAlert(`${phaseName} matches have been generated!`);
}

function generateFinals() {
  STATE.currentPhase = "final";
  
  // Semi-finals matches (last 2 matches)
  const totalFixtures = STATE.fixtures.length;
  const sfMatches = STATE.fixtures.slice(totalFixtures - 2);
  
  const finalistCodes = [];
  const thirdPlaceCodes = [];

  sfMatches.forEach(f => {
    let winnerCode = "";
    let loserCode = "";
    if (f.homeScore > f.awayScore) {
      winnerCode = f.homeCode;
      loserCode = f.awayCode;
    } else if (f.homeScore < f.awayScore) {
      winnerCode = f.awayCode;
      loserCode = f.homeCode;
    } else {
      winnerCode = f.penaltyWinner === "home" ? f.homeCode : f.awayCode;
      loserCode = winnerCode === f.homeCode ? f.awayCode : f.homeCode;
    }

    finalistCodes.push(winnerCode);
    thirdPlaceCodes.push(loserCode);
  });

  const finalist1 = STATE.teams.find(t => t.code === finalistCodes[0]);
  const finalist2 = STATE.teams.find(t => t.code === finalistCodes[1]);
  const third1 = STATE.teams.find(t => t.code === thirdPlaceCodes[0]);
  const third2 = STATE.teams.find(t => t.code === thirdPlaceCodes[1]);

  // Create matches
  const thirdPlaceMatch = createFixture(third1, third2, "Third Place Match");
  const finalMatch = createFixture(finalist1, finalist2, "Final");

  STATE.fixtures.push(thirdPlaceMatch, finalMatch);
  showTournamentAlert("The World Cup Final and Third Place Match have been scheduled!");
}

function announceWinner() {
  // Final match is the last match
  const finalMatch = STATE.fixtures[STATE.fixtures.length - 1];
  let winnerName = "";
  let winnerFlag = "";
  
  if (finalMatch.homeScore > finalMatch.awayScore) {
    winnerName = finalMatch.homeTeam;
    winnerFlag = finalMatch.homeFlag;
  } else if (finalMatch.homeScore < finalMatch.awayScore) {
    winnerName = finalMatch.awayTeam;
    winnerFlag = finalMatch.awayFlag;
  } else {
    winnerName = finalMatch.penaltyWinner === "home" ? finalMatch.homeTeam : finalMatch.awayTeam;
    winnerFlag = finalMatch.penaltyWinner === "home" ? finalMatch.homeFlag : finalMatch.awayFlag;
  }

  // Set winner qualified status or print celebration
  showTournamentAlert(`🏆 CONGRATULATIONS! ${winnerFlag} ${winnerName} has won the 2026 FIFA World Cup! 🏆`);
  
  // Trigger trophy glow animation
  const trophy = document.getElementById("hero-trophy-display");
  if (trophy) {
    trophy.style.filter = "drop-shadow(0 0 35px #d4af37)";
    trophy.style.transform = "scale(1.15)";
  }
}

function showTournamentAlert(message) {
  // Simple notifications bar or overlay
  const alertBar = document.createElement("div");
  alertBar.style.position = "fixed";
  alertBar.style.bottom = "20px";
  alertBar.style.right = "20px";
  alertBar.style.background = "linear-gradient(135deg, #0e1a2f, #060c18)";
  alertBar.style.border = "2px solid var(--gold-primary)";
  alertBar.style.padding = "1rem 1.5rem";
  alertBar.style.borderRadius = "8px";
  alertBar.style.zIndex = "2000";
  alertBar.style.color = "#fff";
  alertBar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 10px var(--gold-glow)";
  alertBar.style.fontFamily = "'Outfit', sans-serif";
  alertBar.style.fontSize = "0.95rem";
  alertBar.style.fontWeight = "600";
  alertBar.innerHTML = `<i class="fa-solid fa-trophy" style="color: var(--gold-primary); margin-right: 0.5rem;"></i> ${message}`;
  
  document.body.appendChild(alertBar);
  setTimeout(() => {
    alertBar.style.opacity = "0";
    alertBar.style.transition = "opacity 0.5s";
    setTimeout(() => alertBar.remove(), 500);
  }, 4500);
}

// ==========================================
// 7. UI RENDERING ENGINE & BINDINGS
// ==========================================

function updateHeroMetrics() {
  document.getElementById("stat-matches").innerText = `${STATE.matchesPlayed} / 104`;
  document.getElementById("stat-goals").innerText = STATE.goalsScored;
  
  const avg = STATE.matchesPlayed > 0 ? (STATE.goalsScored / STATE.matchesPlayed).toFixed(2) : "0.00";
  document.getElementById("stat-avg-goals-val").innerText = avg;
  
  document.getElementById("stat-cards-val").innerText = `${STATE.yellowCards} / ${STATE.redCards}`;
}

// Render Overview tab: Group tables & widgets
function renderOverviewTab() {
  // Render group standing cards
  const grid = document.getElementById("groups-cards-grid");
  grid.innerHTML = "";

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  
  // Filter groups
  const filteredGroups = STATE.groupFilter === "all" ? groups : [STATE.groupFilter];

  filteredGroups.forEach(gName => {
    // Get group teams and sort them
    const grpTeams = STATE.teams.filter(t => t.group === gName).map(t => ({ ...t }));
    sortGroupStandings(grpTeams);

    const card = document.createElement("div");
    card.className = "group-card";
    
    let tableRowsHTML = "";
    grpTeams.forEach((t, idx) => {
      // 2026 rules: Top 2 advance directly. Top 8 third places also advance.
      let rowClass = "";
      if (idx < 2) rowClass = "qualify-direct";
      else if (idx === 2) rowClass = "qualify-third";

      const diffPrefix = t.goalDifference > 0 ? "+" : "";
      
      tableRowsHTML += `
        <tr class="${rowClass}">
          <td class="num-col pos-num">${idx + 1}</td>
          <td class="table-team-cell">
            <span class="team-flag">${t.flag}</span>
            <span>${t.name}</span>
            ${t.eliminated ? '<span style="color: var(--danger); font-size: 0.65rem;">(E)</span>' : ''}
            ${t.qualified ? '<span style="color: var(--success); font-size: 0.65rem;">(Q)</span>' : ''}
          </td>
          <td class="num-col">${t.played}</td>
          <td class="num-col">${diffPrefix}${t.goalDifference}</td>
          <td class="points-col">${t.points}</td>
        </tr>
      `;
    });

    card.innerHTML = `
      <h3 class="group-name">
        <span>Group ${gName}</span>
        <i class="fa-solid fa-list-ol" style="font-size: 0.85rem; opacity: 0.6;"></i>
      </h3>
      <table class="group-table">
        <thead>
          <tr>
            <th class="num-col">#</th>
            <th>Team</th>
            <th class="num-col">Pld</th>
            <th class="num-col">GD</th>
            <th class="points-col">Pts</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHTML}
        </tbody>
      </table>
    `;
    grid.appendChild(card);
  });

  // Render sidebar upcoming match widget (take first 4 uncompleted)
  const upcomingList = document.getElementById("upcoming-matches-widget-list");
  upcomingList.innerHTML = "";
  const upcoming = STATE.fixtures.filter(f => !f.completed).slice(0, 4);

  if (upcoming.length === 0) {
    upcomingList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1rem 0;">No upcoming matches.</div>`;
  } else {
    upcoming.forEach(f => {
      const matchItem = document.createElement("div");
      matchItem.className = "widget-match-item";
      matchItem.style.cursor = "pointer";
      matchItem.onclick = () => simulateSpecificMatch(f.id);
      matchItem.innerHTML = `
        <div class="widget-match-meta">
          <span>${f.phase} ${f.group ? "- Group " + f.group : ""}</span>
          <span>${f.date}</span>
        </div>
        <div class="widget-match-teams">
          <div class="widget-match-team-row">
            <div class="widget-match-team-info">
              <span>${f.homeFlag}</span>
              <span>${f.homeTeam}</span>
            </div>
            <span class="widget-match-score">vs</span>
          </div>
          <div class="widget-match-team-row">
            <div class="widget-match-team-info">
              <span>${f.awayFlag}</span>
              <span>${f.awayTeam}</span>
            </div>
            <span class="widget-match-score"></span>
          </div>
        </div>
      `;
      upcomingList.appendChild(matchItem);
    });
  }

  // Render recent results widget (last 4 completed)
  const recentList = document.getElementById("recent-results-widget-list");
  recentList.innerHTML = "";
  const completed = STATE.fixtures.filter(f => f.completed);
  const recent = completed.slice(Math.max(0, completed.length - 4)).reverse();

  if (recent.length === 0) {
    recentList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1rem 0;">No matches simulated yet.</div>`;
  } else {
    recent.forEach(f => {
      const matchItem = document.createElement("div");
      matchItem.className = "widget-match-item";
      matchItem.innerHTML = `
        <div class="widget-match-meta">
          <span>${f.phase} ${f.group ? "- Group " + f.group : ""}</span>
          <span>${f.date}</span>
        </div>
        <div class="widget-match-teams">
          <div class="widget-match-team-row">
            <div class="widget-match-team-info">
              <span>${f.homeFlag}</span>
              <span style="${f.homeScore > f.awayScore ? 'font-weight: 700;' : ''}">${f.homeTeam}</span>
            </div>
            <span class="widget-match-score" style="${f.homeScore > f.awayScore ? 'color: var(--gold-primary); font-weight: 800;' : ''}">${f.homeScore}</span>
          </div>
          <div class="widget-match-team-row">
            <div class="widget-match-team-info">
              <span>${f.awayFlag}</span>
              <span style="${f.awayScore > f.homeScore ? 'font-weight: 700;' : ''}">${f.awayTeam}</span>
            </div>
            <span class="widget-match-score" style="${f.awayScore > f.homeScore ? 'color: var(--gold-primary); font-weight: 800;' : ''}">${f.awayScore}</span>
          </div>
        </div>
      `;
      recentList.appendChild(matchItem);
    });
  }
}

// Render Fixtures tab
function renderFixturesTab() {
  const grid = document.getElementById("fixtures-cards-grid");
  grid.innerHTML = "";
  
  // Filter fixtures based on tab toggle
  let filtered = [...STATE.fixtures];
  if (STATE.fixtureFilter === "upcoming") {
    filtered = filtered.filter(f => !f.completed);
  } else if (STATE.fixtureFilter === "completed") {
    filtered = filtered.filter(f => f.completed);
  } else if (STATE.fixtureFilter === "knockout") {
    filtered = filtered.filter(f => f.group === "");
  }

  // Filter based on select phase dropdown
  const selectVal = document.getElementById("tournament-phase-select").value;
  if (selectVal !== "all") {
    if (selectVal === "group") {
      filtered = filtered.filter(f => f.phase === "Group Stage");
    } else if (selectVal === "r32") {
      filtered = filtered.filter(f => f.phase === "Round of 32");
    } else if (selectVal === "r16") {
      filtered = filtered.filter(f => f.phase === "Round of 16");
    } else if (selectVal === "qf") {
      filtered = filtered.filter(f => f.phase === "Quarter-finals");
    } else if (selectVal === "sf") {
      filtered = filtered.filter(f => f.phase === "Semi-finals");
    } else if (selectVal === "final") {
      filtered = filtered.filter(f => ["Final", "Third Place Match"].includes(f.phase));
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem 0;">No matching matches found for this filter.</div>`;
    return;
  }

  filtered.forEach(f => {
    const card = document.createElement("div");
    card.className = "fixture-card";
    
    // Status text & class
    let statusClass = "upcoming";
    let statusLabel = "Upcoming";
    if (f.completed) {
      statusClass = "completed";
      statusLabel = "Completed";
    }
    
    // Scorer details text block
    let scorersHTML = "";
    if (f.completed && f.events.length > 0) {
      const goals = f.events.filter(e => e.type === "goal");
      scorersHTML = `<div class="fixture-scorers">`;
      if (goals.length === 0) {
        scorersHTML += `<div style="text-align: center; color: var(--text-muted); font-style: italic;">No goals scored.</div>`;
      } else {
        goals.forEach(g => {
          scorersHTML += `
            <div class="scorer-row">
              <span class="scorer-name">${g.flag} ${g.playerName}</span>
              <span class="scorer-minute">${g.minute}'</span>
            </div>
          `;
        });
      }
      scorersHTML += `</div>`;
    }

    // Action button
    let simulateBtnHTML = "";
    if (!f.completed) {
      simulateBtnHTML = `
        <button class="fixture-simulate-card-btn" onclick="simulateSpecificMatch(${f.id})">
          <i class="fa-solid fa-bolt"></i> Simulate
        </button>
      `;
    }

    card.innerHTML = `
      <div class="fixture-meta">
        <span>${f.phase} ${f.group ? "- Group " + f.group : ""}</span>
        <span class="fixture-status ${statusClass}">${statusLabel}</span>
      </div>
      
      <div class="fixture-teams-display">
        <div class="fixture-team-item">
          <span class="fixture-team-flag">${f.homeFlag}</span>
          <span class="fixture-team-name">${f.homeTeam}</span>
        </div>
        
        <div class="fixture-score-area">
          ${f.completed ? `
            <span class="fixture-score-text">${f.homeScore} - ${f.awayScore}</span>
            ${f.penaltyWinner ? `<span style="font-size: 0.62rem; color: var(--gold-primary); text-transform: uppercase;">AET (Pens)</span>` : f.extraTime ? `<span style="font-size: 0.62rem; color: var(--gold-primary); text-transform: uppercase;">AET</span>` : ''}
          ` : `
            <span class="fixture-vs">VS</span>
          `}
        </div>
        
        <div class="fixture-team-item">
          <span class="fixture-team-flag">${f.awayFlag}</span>
          <span class="fixture-team-name">${f.awayTeam}</span>
        </div>
      </div>
      
      ${scorersHTML}
      <div class="fixture-footer">
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.5rem;">
          <i class="fa-solid fa-location-dot"></i> ${f.venue}
        </div>
        ${simulateBtnHTML}
      </div>
    `;
    grid.appendChild(card);
  });
}

function simulateSpecificMatch(fixtureId) {
  // Trigger animation and redraw on completion
  playLiveSimulation(fixtureId, () => {
    checkAndGenerateNextPhase();
    refreshCurrentTab();
    updateHeroMetrics();
  });
}

// Render Squad Statistics tab
function renderSquadsTab() {
  const teamSelector = document.getElementById("squad-team-selector");
  
  // Populate dropdown once if empty
  if (teamSelector.options.length === 0) {
    // Sort teams alphabetically
    const sorted = [...STATE.teams].sort((a,b) => a.name.localeCompare(b.name));
    sorted.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.code;
      opt.innerText = `${t.flag} ${t.name}`;
      teamSelector.appendChild(opt);
    });
    teamSelector.value = STATE.selectedSquadTeam;
  }

  // Get active team details
  const teamObj = STATE.teams.find(t => t.code === STATE.selectedSquadTeam);
  document.getElementById("squad-summary-rating").innerText = teamObj ? teamObj.rating : "75";
  
  // Total goals scored by team
  let totalGoals = 0;
  STATE.fixtures.filter(f => f.completed).forEach(f => {
    if (f.homeCode === STATE.selectedSquadTeam) totalGoals += f.homeScore;
    if (f.awayCode === STATE.selectedSquadTeam) totalGoals += f.awayScore;
  });
  document.getElementById("squad-summary-goals").innerText = totalGoals;

  // Total cleansheets by team
  const squadPlayers = STATE.players.filter(p => p.teamCode === STATE.selectedSquadTeam);
  const gk = squadPlayers.find(p => p.pos === "GK");
  document.getElementById("squad-summary-cleansheets").innerText = gk ? gk.cleansheets : 0;

  // Filter squad players based on global top bar player search or localized search queries
  let displayPlayers = [...squadPlayers];
  if (STATE.searchQuery) {
    const q = STATE.searchQuery.toLowerCase();
    displayPlayers = displayPlayers.filter(p => p.name.toLowerCase().includes(q));
  }

  // Apply sorting
  displayPlayers.sort((a, b) => {
    let valA = a[STATE.squadSortKey];
    let valB = b[STATE.squadSortKey];
    
    // Sort helper string vs number
    if (typeof valA === "string") {
      return STATE.squadSortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    } else {
      return STATE.squadSortDesc ? valB - valA : valA - valB;
    }
  });

  const tbody = document.getElementById("squad-players-tbody");
  tbody.innerHTML = "";

  if (displayPlayers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 2rem;">No players match your search criteria.</td></tr>`;
    return;
  }

  displayPlayers.forEach(p => {
    // Rating badge style
    let rBadge = "average";
    if (p.rating >= 85) rBadge = "excellent";
    else if (p.rating >= 78) rBadge = "good";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${p.name}</strong></td>
      <td><span style="font-weight: 600; color: var(--text-secondary);">${p.pos}</span></td>
      <td class="rating-val">
        <span class="rating-badge ${rBadge}">${p.rating}</span>
      </td>
      <td class="num-col">${p.goals}</td>
      <td class="num-col">${p.assists}</td>
      <td class="num-col" style="color: var(--warning);">${p.yellow}</td>
      <td class="num-col" style="color: var(--danger); font-weight: 700;">${p.red}</td>
    `;
    tbody.appendChild(row);
  });
}

// Render Leaders tab: Top 5 lists
function renderLeadersTab() {
  // Sort global players lists
  const scorersList = [...STATE.players].sort((a, b) => {
    if (b.goals !== a.goals) return b.goals - a.goals;
    return b.rating - a.rating; // tie-breaker
  }).slice(0, 5);

  const assistersList = [...STATE.players].sort((a, b) => {
    if (b.assists !== a.assists) return b.assists - a.assists;
    return b.rating - a.rating;
  }).slice(0, 5);

  const cleanSheetsList = [...STATE.players].filter(p => p.pos === "GK").sort((a, b) => {
    if (b.cleansheets !== a.cleansheets) return b.cleansheets - a.cleansheets;
    return b.rating - a.rating;
  }).slice(0, 5);

  // Render scorers
  const scorersCont = document.getElementById("leaderboard-goals");
  scorersCont.innerHTML = "";
  scorersList.forEach((p, idx) => {
    const item = document.createElement("div");
    item.className = `leader-item ${idx === 0 ? 'podium-1' : ''}`;
    item.innerHTML = `
      <div class="leader-info-block">
        <span class="leader-rank">${idx + 1}</span>
        <div class="leader-details">
          <span class="leader-name">${p.name}</span>
          <span class="leader-team">${p.teamFlag} ${p.teamName}</span>
        </div>
      </div>
      <span class="leader-value">${p.goals} <span style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 500;">goals</span></span>
    `;
    scorersCont.appendChild(item);
  });

  // Render assists
  const assistsCont = document.getElementById("leaderboard-assists");
  assistsCont.innerHTML = "";
  assistersList.forEach((p, idx) => {
    const item = document.createElement("div");
    item.className = `leader-item ${idx === 0 ? 'podium-1' : ''}`;
    item.innerHTML = `
      <div class="leader-info-block">
        <span class="leader-rank">${idx + 1}</span>
        <div class="leader-details">
          <span class="leader-name">${p.name}</span>
          <span class="leader-team">${p.teamFlag} ${p.teamName}</span>
        </div>
      </div>
      <span class="leader-value">${p.assists} <span style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 500;">assists</span></span>
    `;
    assistsCont.appendChild(item);
  });

  // Render cleansheets
  const csCont = document.getElementById("leaderboard-cleansheets");
  csCont.innerHTML = "";
  cleanSheetsList.forEach((p, idx) => {
    const item = document.createElement("div");
    item.className = `leader-item ${idx === 0 ? 'podium-1' : ''}`;
    item.innerHTML = `
      <div class="leader-info-block">
        <span class="leader-rank">${idx + 1}</span>
        <div class="leader-details">
          <span class="leader-name">${p.name}</span>
          <span class="leader-team">${p.teamFlag} ${p.teamName}</span>
        </div>
      </div>
      <span class="leader-value">${p.cleansheets} <span style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 500;">shutouts</span></span>
    `;
    csCont.appendChild(item);
  });
}

// Render Host Venues tab
function renderVenuesTab(filterCountry = "all") {
  const container = document.getElementById("venues-grid-container");
  container.innerHTML = "";

  const filteredVenues = filterCountry === "all" ? VENUES : VENUES.filter(v => v.country === filterCountry);

  filteredVenues.forEach(v => {
    const card = document.createElement("div");
    card.className = "venue-card";
    card.setAttribute("data-country", v.country);
    
    let flag = "🇺🇸";
    if (v.country === "Canada") flag = "🇨🇦";
    else if (v.country === "Mexico") flag = "🇲🇽";

    card.innerHTML = `
      <div class="venue-info">
        <h3 class="venue-city">${v.city}</h3>
        <span class="venue-stadium">${v.stadium}</span>
      </div>
      
      <div class="venue-meta-rows">
        <div class="venue-meta-item">
          <i class="fa-solid fa-users"></i>
          <span>Capacity: ${v.capacity.toLocaleString()}</span>
        </div>
        <div class="venue-meta-item">
          <i class="fa-solid fa-circle-nodes"></i>
          <span>${v.matches}</span>
        </div>
      </div>
      
      <span class="venue-country-tag">
        <span>${flag}</span>
        <span>${v.country}</span>
      </span>
    `;
    container.appendChild(card);
  });
}

function refreshCurrentTab() {
  if (STATE.currentTab === "overview") renderOverviewTab();
  else if (STATE.currentTab === "fixtures") renderFixturesTab();
  else if (STATE.currentTab === "squads") renderSquadsTab();
  else if (STATE.currentTab === "leaders") renderLeadersTab();
  else if (STATE.currentTab === "venues") renderVenuesTab();
}

// Global player search handling (redirects to squads and filters matching results)
function handleGlobalPlayerSearch(query) {
  STATE.searchQuery = query;
  if (!query) {
    refreshCurrentTab();
    return;
  }

  // Find which team(s) matching players belong to
  const matchingPlayers = STATE.players.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  
  if (matchingPlayers.length > 0) {
    // If query has exact team code matches, select it
    // Otherwise select the first matching player's team and switch tabs to squads
    const matchingTeamCode = matchingPlayers[0].teamCode;
    STATE.selectedSquadTeam = matchingTeamCode;
    
    // Switch tab to squads
    switchTab("squads");
    
    // Set selection selector values
    document.getElementById("squad-team-selector").value = matchingTeamCode;
  }
  
  renderSquadsTab();
}

// Switch tabs utility
function switchTab(tabKey) {
  STATE.currentTab = tabKey;
  
  // Update sidebar menu layout
  const navItems = document.querySelectorAll(".nav-menu .nav-item");
  navItems.forEach(item => {
    if (item.getAttribute("data-tab") === tabKey) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Toggle active class on main sections
  const sections = document.querySelectorAll(".main-content .dashboard-section");
  sections.forEach(sec => {
    if (sec.id === `section-${tabKey}`) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  // Render contents
  refreshCurrentTab();
}

// Simulate next match in schedule sequentially
function simulateNextMatch() {
  const nextMatch = STATE.fixtures.find(f => !f.completed);
  if (!nextMatch) {
    showTournamentAlert("No upcoming matches remaining! The World Cup is complete.");
    return;
  }
  
  // Trigger live simulation
  playLiveSimulation(nextMatch.id, () => {
    checkAndGenerateNextPhase();
    refreshCurrentTab();
    updateHeroMetrics();
  });
}

// ==========================================
// 8. EVENT LISTENERS AND LIFE CYCLES
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Setup databases & initial schedule
  initData();
  
  // Render initial panels
  updateHeroMetrics();
  renderOverviewTab();

  // Tab Menu Bindings
  const navItems = document.querySelectorAll(".nav-menu .nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = item.getAttribute("data-tab");
      switchTab(tab);
    });
  });

  // Global Player Search Bindings
  const searchInput = document.getElementById("global-player-search");
  searchInput.addEventListener("input", (e) => {
    handleGlobalPlayerSearch(e.target.value);
  });

  // Select Phase Dropdown bindings
  const phaseSelect = document.getElementById("tournament-phase-select");
  phaseSelect.addEventListener("change", (e) => {
    STATE.fixtureFilter = "all"; // reset other filter
    // Set active phase filters
    const val = e.target.value;
    if (val !== "all") {
      STATE.currentPhase = val;
    }
    refreshCurrentTab();
  });

  // Simulate Next button
  const simNextBtn = document.getElementById("simulate-next-btn");
  simNextBtn.addEventListener("click", () => {
    simulateNextMatch();
  });

  // Group stand filter tabs on Overview
  const groupFilters = document.getElementById("groups-filter-container");
  groupFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("group-filter-btn")) {
      // Toggle active states
      document.querySelectorAll(".group-filter-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      
      STATE.groupFilter = e.target.getAttribute("data-group");
      renderOverviewTab();
    }
  });

  // Fixtures Sub Filter buttons bindings
  const fixturesFilterTabs = document.getElementById("fixtures-filter-tabs-container");
  fixturesFilterTabs.addEventListener("click", (e) => {
    if (e.target.classList.contains("fixtures-filter-btn")) {
      document.querySelectorAll(".fixtures-filter-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      
      STATE.fixtureFilter = e.target.getAttribute("data-filter");
      renderFixturesTab();
    }
  });

  // Squad Selector dropdown binding
  const squadTeamSelector = document.getElementById("squad-team-selector");
  squadTeamSelector.addEventListener("change", (e) => {
    STATE.selectedSquadTeam = e.target.value;
    renderSquadsTab();
  });

  // Squad table sort headers binding
  const squadHeaders = document.querySelectorAll("#squad-players-table th[data-sort]");
  squadHeaders.forEach(th => {
    th.addEventListener("click", () => {
      const key = th.getAttribute("data-sort");
      if (STATE.squadSortKey === key) {
        // Toggle direction
        STATE.squadSortDesc = !STATE.squadSortDesc;
      } else {
        STATE.squadSortKey = key;
        STATE.squadSortDesc = true; // default desc
      }
      
      // Update icons layout indicators
      squadHeaders.forEach(hdr => {
        const icon = hdr.querySelector("i");
        if (hdr === th) {
          icon.className = STATE.squadSortDesc ? "fa-solid fa-sort-down" : "fa-solid fa-sort-up";
        } else {
          icon.className = "fa-solid fa-sort";
        }
      });

      renderSquadsTab();
    });
  });

  // Host Nation Overview Widget Cards Bindings
  const hostUsaCard = document.getElementById("host-card-usa");
  const hostCanadaCard = document.getElementById("host-card-canada");
  const hostMexicoCard = document.getElementById("host-card-mexico");

  if (hostUsaCard) {
    hostUsaCard.addEventListener("click", () => {
      switchTab("venues");
      renderVenuesTab("USA");
    });
  }
  if (hostCanadaCard) {
    hostCanadaCard.addEventListener("click", () => {
      switchTab("venues");
      renderVenuesTab("Canada");
    });
  }
  if (hostMexicoCard) {
    hostMexicoCard.addEventListener("click", () => {
      switchTab("venues");
      renderVenuesTab("Mexico");
    });
  }

  // Modal Done Button and Close buttons binding
  const doneBtn = document.getElementById("modal-action-btn");
  const closeBtn = document.getElementById("modal-close-btn");
  const modal = document.getElementById("simulation-modal");

  const hideModal = () => {
    modal.classList.remove("active");
  };

  doneBtn.addEventListener("click", hideModal);
  closeBtn.addEventListener("click", hideModal);
});
