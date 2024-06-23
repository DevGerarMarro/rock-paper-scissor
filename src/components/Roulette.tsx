import { FC, useEffect, useState } from "react";
import paper from '../assets/img/paper.png';
import rock from '../assets/img/rock.png';
import scissor from '../assets/img/scissors.png';
import { props } from "../types/types";

const options: string[] = [rock, paper, scissor];

const Roulette: FC<props> = ({ onSelection }) => {
    const [botSelection, setBotSelection] = useState<string>(rock);
    const [stoped, setStoped] = useState<boolean>(false);

    const getRandomOption = (): string => {
        const random = Math.floor(Math.random() * 3);
        return options[random];
    };

    useEffect(() => {
        let interval = setInterval(() => {
            setBotSelection(getRandomOption());
        }, 100);

        // Detener el intervalo en un tiempo aleatorio entre 1 y 5 segundos
        const randomStopTime = Math.floor(Math.random() * 5000) + 1000;
        const timeout = setTimeout(() => {
            setStoped(true);
            clearInterval(interval);
        }, randomStopTime);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if(stoped){
            switch (botSelection) {
                case rock:
                    onSelection('rock');
                    break;
                case paper:
                    onSelection('paper');
                    break;
                case scissor:
                    onSelection('scissor')
                    break;
                default:
                    break;
            }
        }

    }, [stoped])

    return (
        <div className="roulette-container">
            <div>
                <img className="logo" src={botSelection} alt="img" />
            </div>
        </div>
    );
}

export default Roulette;
