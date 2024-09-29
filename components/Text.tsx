import constants from "@/lib/constants";

interface TextProps {
    children: any;
    style?: object;
}

export default function Text({ children, style }: TextProps) {

    return (
        <p style={{
            // I need to add a new font from google fonts
            fontFamily: 'Titillium Web',
            color: 'white',
            ...style,
        }}>{children}</p>
    );
}