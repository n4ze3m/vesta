import { Text, Badge, Image, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  url: {
    fontSize: 10,
    fontStyle: "italic",
    
  },
}));

export default function LinkPreview({ data }: any) {
  const { classes } = useStyles();
  const trimURL = (url: string) => {
    if (url.length > 50) {
      return url.substring(0, 50) + "...";
    }
    return url;
  };
  return (
    <div
      className="d-flex align-items-center"
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        if (window !== undefined) {
          window.open(data.target_url, "_blank");
        }
      }}
    >
      <div className="w-100">
        <Text size="sm" weight={500}
          className="short"
        >
          {/* {trimTitle(data.title)} */}
          {data.title}
        </Text>
        <p
          style={{
            fontSize: "8pt",
          }}
          className="short"
        >
          {data.description}
        </p>
        <div className={classes.url}>{new URL(data.target_url).hostname}</div>
      </div>
      <div>
        <div className="ml-2">
          <Image
            src={data.image}
            height={50}
            width={50}
            radius="md"
            //  fit="contain"
            withPlaceholder
          />
        </div>
      </div>
    </div>
  );
}
