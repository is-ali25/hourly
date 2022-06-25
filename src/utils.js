export function blankForm() {
    return {
        name: '',
        description: '',
        startDate:'',
        hours:''
      }
}

export function formToGoal(submission) {
    const goal = {
        id: submission.id,
        name: submission.name,
        startDate:submission.startDate,
        hours:submission.hours,
        tasks: []
    }

    return goal
}