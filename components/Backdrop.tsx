import constants from "@/lib/constants";

export default function Backdrop() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
        }}>
            <img src={"https://img.freepik.com/free-photo/abstract-luxury-blur-dark-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-63996.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727481600&semt=ais_hybrid"} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }} />
        </div>
    )
}