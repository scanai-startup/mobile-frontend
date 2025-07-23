export default function getHref(
  title: string,
  depositId: number,
  isAvailable: boolean,
  content: string,
  contentId: number,
  capacity: number,
  volume: number,
) {
  return isAvailable
    ? {
        pathname: "/(tankControl)/[emptyTank]",
        params: { tank: title, depositId, capacity },
      }
    : {
        pathname: "/tank/[tank]",
        params: {
          tank: title,
          depositId,
          content,
          contentId,
          capacity,
          volume,
        },
      };
}
