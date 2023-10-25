declare module "types" {
    interface Trip {
        arrival: string,
        operator: string,
        ship: string,
        time: string,
      }

      interface TripDays {
        route: string,
        month: number,
        year: number,
        days: Array<number>
      }
}

module.exports = 'types'