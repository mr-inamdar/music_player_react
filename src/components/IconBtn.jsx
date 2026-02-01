// const IconBtn = ({ src, onClick }) => {
//     return (
//         <button className={`${onClick}`}>
//             <img src={src || null} alt="icon-btn" width="24px" height="24px" />
//         </button>
//     );
// };
const IconBtn = ({ src, onClick }) => {
    return (
        <button onClick={onClick} className="icon-btn">
            <img src={src} alt="icon-btn" width="24" height="24" />
        </button>
    );
};

const Play = ({onClick}) => {
    return <IconBtn src="./icons/play.svg" onClick={onClick} />
}

const Pause = ({onClick}) => {
    return <IconBtn src="./icons/pause.svg" onClick={onClick} />
}

const Next = ({onClick}) => {
    return <IconBtn src="./icons/next.svg" onClick={onClick} />
}

const Previous = ({onClick}) => {
    return <IconBtn src="./icons/prev.svg" onClick={onClick} />
}

export {Play, Pause, Previous, Next};