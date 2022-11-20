import {Card, CardContent, Typography} from "@mui/material";
import {useCallback, useState} from "react";


const PlayGame = () => {

    const [tile11, setTile11] = useState("");
    const [tile21, setTile21] = useState("");
    const [tile31, setTile31] = useState("");
    const [tile12, setTile12] = useState("");
    const [tile22, setTile22] = useState("");
    const [tile32, setTile32] = useState("");
    const [tile13, setTile13] = useState("");
    const [tile23, setTile23] = useState("");
    const [tile33, setTile33] = useState("");

    const [currentPlayer, setCurrentPlayer] = useState(1)

    const style = {
        border: "1px solid black",
        width: "50px",
        height: "50px",
    }


    const userClick = (x, y) => {

        switch (`${x}${y}`) {
            case '11': {
                if (tile11 === '') {
                    setTile11(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '12': {
                if (tile12 === '') {
                    setTile12(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '13': {
                if (tile13 === '') {
                    setTile13(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '21': {
                if (tile21 === '') {
                    setTile21(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '22': {
                if (tile22 === '') {
                    setTile22(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '23': {
                if (tile23 === '') {
                    setTile23(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '31': {
                if (tile31 === '') {
                    setTile31(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '32': {
                if (tile32 === '') {
                    setTile32(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
            case '33': {
                if (tile33 === '') {
                    setTile33(currentPlayer === 1 ? "X" : "O")
                }
                break;
            }
        }

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        watchTermination();

    }

    const watchTermination = () => {
        if (
            (tile11 === 'X' && tile21 === 'X' && tile31 === 'X') ||
            (tile12 === 'X' && tile22 === 'X' && tile32 === 'X') ||
            (tile13 === 'X' && tile23 === 'X' && tile33 === 'X') ||
            (tile11 === 'X' && tile12 === 'X' && tile13 === 'X') ||
            (tile21 === 'X' && tile22 === 'X' && tile23 === 'X') ||
            (tile31 === 'X' && tile32 === 'X' && tile33 === 'X') ||
            (tile11 === 'X' && tile22 === 'X' && tile33 === 'X') ||
            (tile13 === 'X' && tile22 === 'X' && tile31 === 'X')
        ) {
            alert("Player X won");
            gameTerminated()
        }

        if (
            (tile11 === 'O' && tile21 === 'O' && tile31 === 'O') ||
            (tile12 === 'O' && tile22 === 'O' && tile32 === 'O') ||
            (tile13 === 'O' && tile23 === 'O' && tile33 === 'O') ||
            (tile11 === 'O' && tile12 === 'O' && tile13 === 'O') ||
            (tile21 === 'O' && tile22 === 'O' && tile23 === 'O') ||
            (tile31 === 'O' && tile32 === 'O' && tile33 === 'O') ||
            (tile11 === 'O' && tile22 === 'O' && tile33 === 'O') ||
            (tile13 === 'O' && tile22 === 'O' && tile31 === 'O')
        ) {
            alert("Player O won");
            gameTerminated()
        }

        if (tile11 !== '' && tile21 !== '' && tile31 !== '' && tile12 !== '' && tile22 !== '' && tile32 !== '' && tile13 !== '' && tile23 !== '' && tile33 !== '') {
            alert("Anyone win");
            gameTerminated()
        }


    }

    const gameTerminated = () => {
        setTile11('')
        setTile21('')
        setTile31('')
        setTile12('')
        setTile22('')
        setTile32('')
        setTile13('')
        setTile23('')
        setTile33('')
        setCurrentPlayer(1)
    }



    return (
        <Card>
            <Typography align="center" variant="h5">Play a game !</Typography>

            <CardContent>

                <table>
                    <tbody style={{textAlign: "center"}}>
                    <tr>
                        <td style={style} onClick={() => userClick(1,1)}>{tile11}</td>
                        <td style={style} onClick={() => userClick(2,1)}>{tile21}</td>
                        <td style={style} onClick={() => userClick(3,1)}>{tile31}</td>
                    </tr>
                    <tr>
                        <td style={style} onClick={() => userClick(1,2)}>{tile12}</td>
                        <td style={style} onClick={() => userClick(2,2)}>{tile22}</td>
                        <td style={style} onClick={() => userClick(3,2)}>{tile32}</td>
                    </tr>
                    <tr>
                        <td style={style} onClick={() => userClick(1,3)}>{tile13}</td>
                        <td style={style} onClick={() => userClick(2,3)}>{tile23}</td>
                        <td style={style} onClick={() => userClick(3,3)}>{tile33}</td>
                    </tr>
                    </tbody>
                </table>

            </CardContent>
        </Card>
    )
}

export default PlayGame;
