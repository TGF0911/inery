import { Led, Button, Board, Piezo } from 'johnny-five'
import { Request, Response } from 'express'
import convertMinutesToHours from '../utils/convertMinutesToHours'
export default {

  async alarm(req: Request, res: Response) {
    const { week_day, hour } = req.params
    const date = new Date()

    const board = new Board()

    const [hours, minutes] = convertMinutesToHours(Number(hour))
    console.log("week_day: ", week_day, "hours: ", hour)
    console.log("horas: ", hours, "min: ", minutes)
    board.on('ready', function () {
      const button = new Button(2)
      var piezo = new Piezo(3)


      board.repl.inject({
        button: button,
        piezo: piezo
      })

      if (Number(week_day) === date.getDay() && hours === date.getHours() && minutes === date.getMinutes()) {
        console.log("entrou Aqui")

        const led = new Led(13)
        led.blink(500)

        piezo.play({
          song: [
            ["C4", 1 / 4],
            ["D4", 1 / 4],
            ["F4", 1 / 4],
            ["D4", 1 / 4],
            ["A4", 1 / 4],
            [null, 1 / 4],
            ["A4", 1],
            ["G4", 1],
            [null, 1 / 2],
            ["C4", 1 / 4],
            ["D4", 1 / 4],
            ["F4", 1 / 4],
            ["D4", 1 / 4],
            ["G4", 1 / 4],
            [null, 1 / 4],
            ["G4", 1],
            ["F4", 1],
            [null, 1 / 2]
          ],
        });

        button.on('press', function () {
          console.log('Led pressed')
          piezo.off()
          led.stop(500)
          return res.sendStatus(200)
        })
      }
    })


  }
}

