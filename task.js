class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }
  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    } else if ( !(this.alarmCollection.find(item => item.time === time)) ) {
      this.alarmCollection.push({time, callback, canCall: true});
    } else {
      console.warn('Уже присутствует звонок на это же время');
    }
  }
  removeClock(time) {
    this.alarmCollection.forEach( (item, index) => {
      if (item.time === time) {
        this.alarmCollection.splice(index, 1);
      }
    })
  }
  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString().slice(0, -3);
  }
  start() {
    if (this.intervalId) {
      return
    } else {
      let startAlarmCollection = this.alarmCollection.forEach( item => {
        if (item.time === this.getCurrentFormattedTime() && item.canCall) {
          item.canCall = false;
          item.callback();          
        }
      })
      this.intervalId = setInterval(startAlarmCollection, 1000)
    }
  }
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  resetAllCalls() {
    this.alarmCollection.forEach( item => item.canCall = true);
  }
  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}