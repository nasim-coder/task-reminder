export const saveReminder = (reminder) => {
    
    if (reminder?.frequency === 'weekly' && reminder?.selectedDays?.length === 0) {
        console.log('savereminder', reminder);
        throw new Error('Please select days');
    }

    if (reminder?.frequency === 'once' && !reminder.date) {
        throw new Error('Please select date');
    }

    if (reminder.task == '') {
        throw new Error('Please enter task to do');
    }

    return true;
}