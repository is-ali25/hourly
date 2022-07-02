export function blankForm() {
    return {
        name: '',
        startDate:'',
        hours:''
      }
}

export function convertToGoal(submission) {
    const goal = {
        id: submission.id,
        name: submission.name,
        startDate:submission.startDate,
        hours:submission.hours.$numberDecimal,
        tasks: submission.tasks
    }

    return goal
}

export function format(submission, id) {
    const formDate = submission['startDate'].split("-")
    console.log(typeof submission.hours)
    const date = new Date(formDate[0], formDate[1] - 1, formDate[2]) //the month (second arg) is zero-indexed
    const hours = parseInt(submission.hours)
    const formatted = {...submission, 'startDate': date, 'hours': hours, 'id': id}
    console.log(formatted)
    return formatted
}