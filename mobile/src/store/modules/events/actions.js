export function saveEventsdata(data) {
  return {
    type: '@auth/SAVE_EVENTS_DATA',
    payload: data,
  };
}

export function clearEventsData() {
  return {
    type: '@auth/CLEAR_EVENTS_DATA',
  };
}
