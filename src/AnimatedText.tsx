type AnimatedTextProps = {
  text: string
}

export default function AnimatedText({ text }: AnimatedTextProps) {
  return (
    <span className="letter-reveal" aria-label={text}>
      {Array.from(text.matchAll(/\S+|\s+/gu), ({ 0: token, index: offset }) => token.trim() === ''
        ? token
        : (
          <span className="letter-reveal-word" aria-hidden="true" key={offset}>
            {Array.from(token).map((letter, index) => (
              <span
                className="letter-reveal-character"
                key={index}
                style={{ transitionDelay: `${((offset ?? 0) + index) * 12}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
    </span>
  )
}
