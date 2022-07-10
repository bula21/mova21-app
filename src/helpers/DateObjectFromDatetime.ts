export default function DateObjectFromDatetime(datetime: string | null) {
  if (typeof datetime === 'string') {
    // Split timestamp into [ Y, M, D, h, m, s ]
    let t = datetime.split(/[- :T]/);

    // Apply each element to the Date function
    if (t.length >= 6) {
      return new Date(
          parseInt(t[0]),
          parseInt(t[1]) - 1,
          parseInt(t[2]),
          parseInt(t[3]),
          parseInt(t[4]),
          parseInt(t[5]),
      );
    }
  }
  return null;
}
