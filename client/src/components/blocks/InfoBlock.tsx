import { StrapiImage } from "../StrapiImage";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import type { InfoBlockProps } from "@/types";

export function InfoBlock({
    theme,
    reversed,
    image,
    headline,
    content,
    cta,
}: Readonly<InfoBlockProps>) {
    console.log("InfoBlock Props:", {
        theme,
        reversed,
        image,
        headline,
        content,
        cta,
    });
    return (
        <section className={`info info--${theme} ${reversed && "info--reversed"}`}>
            <StrapiImage
                src={image.url}
                alt={image.alternativeText || "No alternative text provided"}
                height={500}
                width={600}
                className="info__image"
            />
            <div className="info__text">
                {/* <h2 className={`info__headline info__headline--${theme}`}> */}
                <h2 className={`info__headline`}>
                    {headline}
                </h2>
                {/* <ReactMarkdown className="copy">{content}</ReactMarkdown> */}
                <div className="copy">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
                {/* {cta?.href && (
                    <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"}>
                        <button className={`btn btn--medium btn--${theme}`}>
                            {cta.text}
                        </button>
                    </Link>
                )} */}
                {cta?.[0]?.href && (
                    <Link href={cta[0].href} target={cta[0].isExternal ? "_blank" : "_self"}>
                        <button className={`btn btn--medium btn--${theme}`}>
                            {cta[0].text}
                        </button>
                    </Link>
                )}
            </div>
        </section>
    );
}