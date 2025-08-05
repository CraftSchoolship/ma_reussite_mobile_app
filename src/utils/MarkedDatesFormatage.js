import { RRule } from "rrule";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const generateRecurrenceDates = (event) => {
  const rule = RRule.fromString(event.rrule);
  const dates = rule.all();

  return dates.map((date) => {
    const startDate = new Date(date);
    const endDate = new Date(date);

    const [startHour, startMinute, startSecond] = event.start
      .split(" ")[1]
      .split(":");
    const [endHour, endMinute, endSecond] = event.stop.split(" ")[1].split(":");

    startDate.setHours(startHour, startMinute, startSecond);
    endDate.setHours(endHour, endMinute, endSecond);

    return {
      _raw: event,
      start: startDate,
      stop: endDate,
      subject: event.subject_id[1],
      classroom: event.classroom_id[1],
      teacher: event.teacher_id[1],
    };
  });
};

const formatOdooEvents = (events) => {
  const markedDates = {};

  events?.forEach((event) => {
    let eventDates = [];

    if (event.recurrency) {
      eventDates = generateRecurrenceDates(event);
    } else {
      eventDates.push({
        ...event,
        _raw: event,
        start: new Date(event.start),
        stop: new Date(event.stop),
        classroom: event.classroom_id[1],
        subject: event.subject_id[1],
        teacher: event.teacher_id[1],
      });
    }

    eventDates.forEach((eventDetail) => {
      const startDate = new Date(eventDetail.start);
      const endDate = new Date(eventDetail.stop);

      const dateKey = startDate.toISOString().split("T")[0];

      const options = { hour: '2-digit', minute: '2-digit', hour12: false };

      const startTime = startDate.toLocaleTimeString([], options);
      const endTime = endDate.toLocaleTimeString([], options);

      const time = `${startTime}-${endTime}`;

      const color = MA_REUSSITE_CUSTOM_COLORS.Primary;
      const tag = "cours";

      const eventDetails = {
        ...eventDetail,
        color: color,
        tag: tag,
        time: time,
        date: eventDetail.start.toISOString().substring(0,10),
      };

      if (!markedDates[dateKey]) {
        markedDates[dateKey] = { dots: [eventDetails] ,events: [] };
      }

      // markedDates[dateKey].dots.push(eventDetails);
      markedDates[dateKey].events.push(eventDetails);
    });
  });
  return markedDates;
};

export { formatOdooEvents };
