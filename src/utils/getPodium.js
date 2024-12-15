export default function getPodium(users) {
  if (!users) return;
  if (users.length >= 3) {
    const greatestToLeast = [...users].sort((a, b) => b.score - a.score);
    const [first, second, third, ...rest] = greatestToLeast;
    const podium = [second, first, third];
    return { podium, rest };
  }

  return [];

  //   return { firstThree: firstThree, rest: rest };
}
