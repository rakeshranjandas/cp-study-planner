import { assign, createMachine } from "xstate"

export const calendarMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbMA7CqBOAdAMoAu+JAxBAPZZgECWWAbtQNb1qY77Fl4kETVgGNUJBrQDaABgC6suYlAAHarAYTaykAA9EAWgCMANhkEZADiMBOAMwAmGQFYA7JZvWjAGhABPQwAWEzsCB3sTVxtnQMsXRwBfBN8ubFxCAElYAHFqaihMVJ48AAU8OGxKGjpGFnZODDTeLNz8wsbisoqsQWFqMS0sRUUdNQ1BnX0EAwdXZwJAmLtA2ZsHB0s3O18A6aNXUId9mxNg62dnG0DApJSO9IIWvIKwIvSu2EqqWno+jgI3s0cs92tx3uVPj0hHUBpIhvIpEYlEgQGNNHDJoZNgQTA5Fi4zNETEZLJYdog7DYFsTXGY7EYZLZLpYbskQIDCK0XhyPl9qr86v8OQQuaCmqUIZVoaJxHDhvJRup0doUVMDIE7K4CHZzoFadYZIzXOSEEYHKFLHYXPq7M5NgyHLd2fdeKLXi68ABBABGkKqP1qrCFHpFIPdYPwPr90v6sukCIVKLRE1VhjsJipJlxcU8etM12cJqtlm1lgOuM8biOdiSbKw1AgcB0HMV4wxqemsXmOqMMX1DKNJoMkXmRpkuOckROJKdwtI5FbyqwmL2BwIdpsrmup0NZjLQ7tWuc+3Hrl7PZnbOFTza4fFvJ6i5ToDVJMC6+c5s-DILlyHdh1AgPAJU4Nj1DUTFnEM3R5SVHyTJVnz0NNLQIE8zFpOYHBMUkTXMNxLAzS0dU8E4HGcKCI05MMOSjSon3bF9EBLKINk-DVbRkZZjX8RAjiMAhonsJxNhZNZYko8UCAANQYMAAHdPRUFQWwQtsVSY6YdVCdCZEwz8cLJXiEHTUICKIgCPA8SDayAA */
    id: "Calendar",
    preserveActionOrder: true,

    context: {
      googleCalendarEvents: [],
      appCalendarEvents: [],

      googleCalendarApi: null,
    },

    states: {
      Start: {
        invoke: {
          src: "listGoogleCalendars",
          onDone: ["IsGoogleCalendarPresent"],
        },
      },

      IsGoogleCalendarPresent: {
        invoke: {
          src: "checkIfGoogleCalendarPresent",
          onDone: [
            {
              target: "GoogleCalendarPresent",
              cond: (_, events) => events.data,
            },

            {
              target: "GoogleCalendarAbsent",
            },
          ],
        },
      },

      GoogleCalendarPresent: {
        invoke: {
          src: "getGoogleCalendarEvents",
          onDone: [
            {
              target: "ViewAppCalendar",
              actions: ["processGoogleCalendarEvents"],
            },
          ],
        },
      },

      GoogleCalendarAbsent: {
        invoke: {
          src: "createGoogleCalendar",
          onDone: "ViewAppCalendar",
        },
      },

      ViewAppCalendar: {
        invoke: {
          src: "loadAppCalendar",
        },
      },

      Dummy: {
        invoke: {
          src: (_, events) => {
            console.log("REACHED END", events)
          },
        },
      },

      Dummy1: {
        invoke: {
          src: (_, events) => {
            console.log("REACHED END 1", events)
          },
        },
      },

      Dummy2: {
        invoke: {
          src: (_, events) => {
            console.log("REACHED END 2", events)
          },
        },
      },
    },

    initial: "Start",
  },
  {
    services: {
      listGoogleCalendars: async (context) => {
        return context.googleCalendarApi.listCalendars()
      },

      checkIfGoogleCalendarPresent: async (context, event) => {
        const found = event.data.find(
          (cal) => cal.summary === context.googleCalendarApi.calendarSummary
        )

        if (found === undefined) return false

        context.googleCalendarApi.setGoogleCalendarId(found.id)
        return true
      },

      getGoogleCalendarEvents: async (context) => {
        return context.googleCalendarApi.getEvents()
      },

      createGoogleCalendar: async (context) => {
        await context.googleCalendarApi.createCalendar()
      },

      loadAppCalendar: async () => {
        console.log("LOAD APP CALENDAR")
      },
    },

    actions: {
      processGoogleCalendarEvents: assign((context, events) => {
        console.log(context, events, "processGoogleCalendarEvents")
      }),
    },
  }
)
