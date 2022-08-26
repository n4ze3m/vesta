import { createStyles, Text, SimpleGrid, Container } from '@mantine/core';
import { BrandChrome, BrandOpenSource, Code } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    supTitle: {
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: 800,
        fontSize: theme.fontSizes.sm,
        color:
            theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 8],
        letterSpacing: 0.5,
        marginBottom: theme.spacing.xs,
    },
    feature: {
        position: "relative",
        paddingTop: theme.spacing.xl,
        paddingLeft: theme.spacing.xl,
    },

    overlay: {
        position: "absolute",
        height: 100,
        width: 160,
        top: 0,
        left: 0,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
        zIndex: 1,
    },

    content: {
        position: "relative",
        zIndex: 2,
    },

    icon: {
        color:
            theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    heroTitle: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        marginBottom: theme.spacing.lg,
        textAlign: "center",

        [theme.fn.smallerThan("sm")]: {
            fontSize: 28,
            textAlign: "left",
        },
    },
    wrapper: {
        position: "relative",
        paddingBottom: 80,

        "@media (max-width: 755px)": {
            paddingBottom: 60,
        },
    },
}));

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
    icon: React.FC<React.ComponentProps<typeof BrandChrome>>,
    title: string;
    description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.feature, className)} {...others}>
            <div className={classes.overlay} />
            <div className={classes.content}>
                <Icon size={38} className={classes.icon} />
                <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
                    {title}
                </Text>
                <Text color="dimmed" size="sm">
                    {description}
                </Text>
            </div>
        </div>
    );
}

const features = [
    {
        icon: BrandChrome,
        title: 'Browser Extension',
        description: 'Use Vesta chrome extension to save notes and bookmark links faster.'
    },
    {
        icon: Code,
        title: 'Programmable API',
        description: 'Vesta API is programmable and can be used to integrate with other applications.'
    },
    {
        icon: BrandOpenSource,
        title: 'Open Source',
        description: 'All the code is open source and available for free to use under the MIT license.'
    },
];

export function LandingFeatures() {
    const items = features.map((item) => <Feature {...item} key={item.title} />);

    return (
        <Container mt={30} mb={30} size="lg">
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
                {items}
            </SimpleGrid>
        </Container>
    );
}