export interface SessionizeResponse {
  speaker: { speakerProfileUrl: string, photoUrl: string },
  sessions: {title: string, description: string, sessionUrl: string }[],
  events: {name: string, eventStartDate: string, location: string, website: string}[],

}
