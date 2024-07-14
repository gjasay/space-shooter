export class Lerp {
  static lerp(start: number, end: number, t: number): number {
    return start + t * (end - start);
  }
  static lerpAngle(start: number, end: number, t: number): number {
    // Normalize the angles to the range [0, 360)
    start = start % 360;
    end = end % 360;
    if (start < 0) start += 360;
    if (end < 0) end += 360;

    // Find the difference and ensure the shortest path
    let delta = end - start;
    if (delta > 180) {
      delta -= 360;
    } else if (delta < -180) {
      delta += 360;
    }

    // Perform the interpolation
    const result = start + delta * t;

    // Normalize the result to the range [0, 360)
    return (result + 360) % 360;
  }
}