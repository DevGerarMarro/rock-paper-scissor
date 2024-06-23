import React, { useEffect, useState } from 'react'
import paper from './assets/img/paper.png';
import rock from './assets/img/rock.png';
import scissor from './assets/img/scissors.png';
import './App.css'
import { ChoicesType } from './types/types';
import Roulette from './components/Roulette';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

function App() {
	const [selection, setSelection] = useState<ChoicesType | null>(null);
	const [loose, setLoose] = useState<boolean|null> (null);
	const [titleClassname, setTitleClassname] = useState<string> ('titles');
	const [winTitle, setWinTitle] = useState<string>('');

	const { height, width } = useWindowSize();

	useEffect(() => {
		if(selection !== null){
			setTitleClassname((prevState) => {
				const newState = prevState + ' hide';
				return newState;
			})
		}else{
			setTitleClassname('titles');
		}
	}, [selection]);

	
	const choose = (choice:ChoicesType) => () => {
		setSelection(choice);
	}

	const onBotSelection = (botChoice:ChoicesType) => {
		if(botChoice === selection){
			
			setLoose(false);
			setWinTitle('Draw');

		} else if(botChoice === "rock" && selection === "scissor"){

			setLoose(true);
			setWinTitle('You Lose');

		}else if(botChoice === "scissor" && selection === "paper"){

			setLoose(true);
			setWinTitle('You Lose');

		}else if(botChoice === "paper" && selection === "rock"){

			setLoose(true);
			setWinTitle('You Lose');

		}else{

			setLoose(false);
			setWinTitle('You Win');

		}

	};

	return (
		<React.Fragment>
			<Confetti 
				width={width}
				height={height}
				hidden={ loose === null || loose }
			/>
			<h1 className={titleClassname}>
				<span className='rock-title'>Rock</span>
				<span className='paper-title'>Paper</span>
				<span className='scissor-title'>Scissor</span>
			</h1>

			<h1 
				id='title-win'
				className={ loose !== null ? 'show' : '' }
				data-tooltip-id="tooltip"
				onClick={() => location.reload()}
			>
				{winTitle}
			</h1>

			<div className='container'>
				
				<img 
					src={rock} 
					className={"logo hand-sign"}
					alt="rock" 
					onClick={choose("rock")} 
					hidden={selection !== "rock" && selection !== null}
				/>

				<img 
					src={paper} 
					className={"logo hand-sign"}
					alt="paper" 
					onClick={choose("paper")}
					hidden={selection !== "paper" && selection !== null}
				/>

				<img 
					src={scissor} 
					className={"logo hand-sign"}
					alt="scissor" 
					onClick={choose("scissor")}
					hidden={selection !== "scissor" && selection !== null}
				/>
				{
					selection !== null &&
					<div className='container'>
						<Roulette 
							onSelection={onBotSelection}
						/>
					</div>
				}
			</div>

			<Tooltip
				id="tooltip"
				place="bottom"
				variant="info"
				content="Click here to reset"
			/>
		</React.Fragment>
	)
}

export default App
