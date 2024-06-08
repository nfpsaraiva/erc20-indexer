import { ActionIcon, Affix, Button, Text, Transition, rem } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import { FC } from "react";


const ScrollToTop: FC = () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Affix position={{ bottom: 15, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <>
                        <Button
                            visibleFrom="sm"
                            leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            Scroll to top
                        </Button>
                        <ActionIcon
                            hiddenFrom="sm"
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
                        </ActionIcon>
                    </>
                )}
            </Transition>
        </Affix>
    );
}

export default ScrollToTop;