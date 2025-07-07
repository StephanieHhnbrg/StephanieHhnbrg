export interface CreedlyResponse {
    data: {
      image_url: string,
      issued_at_date: string,
      issuer: {
        summary: string,
        entities: {
          entity: {
            id: string,
            name: string,
            url: string,
          },
        }[]
      },
      badge_template: {
        id: string,
        name: string,
        description: string,
        url: string,
        skills: { name: string }[]
      }
    }[]
}
