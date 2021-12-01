import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import "@fontsource/nanum-pen-script";
import {useSelector} from "react-redux"; // Defaults to weight 400.
import withTransition from "../HOC/withTransition";
import {getURL} from "next/dist/shared/lib/utils";

const share = '/images/Share.svg';
const qr = '/images/Qr.png';
const avanti = "/images/Avanti.svg";
const image = "/images/Image.svg";
const fasi = "/images/Group 10.svg";


function Page6() {

    useEffect(() => {
        const root = document.documentElement
        root.style.setProperty('--green', "#FFFFFF");
    })

    //window.scrollTo(0, 0);

    const qrPanel = useRef()

    const qrOptions = useSelector(state => state.qrOptions.value)

    const [qrCode, setQrCode] = useState(null)

    useEffect(() => {
        const dynamicImports = async () => {
            const QRCodeStyling = (await import("qr-code-styling")).default
            setQrCode(new QRCodeStyling(qrOptions))
        }
        dynamicImports()
    }, [])

    useEffect(() => {
        if (qrCode) {
            qrCode.append(qrPanel.current)
        }
    }, [qrCode])


    useEffect(() => {
        if (qrCode) {
            qrCode.update(qrOptions)
            qrCode.getRawData('jpeg').then(d => console.log(URL.createObjectURL(d)))
        }
    }, [qrCode, qrOptions])

    const onDownloadClicked = () => {
        qrCode.download({extension: "jpeg"})
    }

    const onShareClick = async () => {
        try {
            await navigator.share({
                title: "Condividi",
                text : "Fai vedere a tutti la tua creazione!",
                url: "https://master.d2g7knv9wv4iw9.amplifyapp.com/",
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
            <div>
                <div className="fase">
                    <img src={fasi} alt="personalization part 6"/>
                </div>

                <div className="qrframe">
                    <div className="frame">
                        <svg ref={qrPanel} viewBox="0 0 1000 1000" style={{width: 200}}/>
                    </div>
                </div>
            </div>

            <div className="panel">
                <div className="guideframe">
                    <div className="guide">
                        Scarica la tua opera
                    </div>
                </div>

                <div className="loadOptions">
                    <div className="loadsx" onClick={onShareClick}>
                        <div>
                            <img src={share} className="icon" alt="share"/>
                        </div>
                        <div className="loadLabel">
                            Condividila
                        </div>
                    </div>
                    <div className="loaddx" onClick={onDownloadClicked}>
                        <div>
                            <img src={image} className="icon" alt="save in gallery"/>
                        </div>
                        <div className="loadLabel">
                            Salva in Galleria
                        </div>
                    </div>
                </div>
                <div className="consiglioFrame">
                    <div className="consiglio">
                        Inviatela su Whatsapp (così non la perdi)
                    </div>
                </div>

                <div className="pagineOptions">
                    <Link href="/page7">
                        <div className="buttonAvanti">
                            <img src={avanti} className="avanti" alt="next page"/>
                        </div>
                    </Link>

                    <Link href="/page5">
                        <div className="buttonIndietro">
                            <img src={avanti} className="indietro" alt="previous page"/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withTransition(Page6);
