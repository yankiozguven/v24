import { Typewriter } from "./typewriter-text"

export const TypewriterDemo = () => {
    return (
        <>
            <Typewriter
                text={["Welcome to HextaUI", "Build awesome websites.", "hextaui.com"]}
                speed={100}
                loop={true}
                className="text-xl font-medium"
            />
        </>
    )
} 