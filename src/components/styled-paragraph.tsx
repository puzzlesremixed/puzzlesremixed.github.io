export const StyledH2 = (props: any) => (
  <h2
    className="font-heading text-3xl font-bold tracking-tight mt-10 mb-4 border-b pb-2"
    {...props}
  />
)

export const StyledH3 = (props: any) => (
  <h3
    className="font-heading text-2xl font-bold tracking-tight mt-8 mb-4"
    {...props}
  />
)

export const StyledP = (props: any) => (
  <p
    className="leading-7 my-6"
    {...props}
  />
)

export const StyledUL = (props: any) => (
  <ul
    className="my-6 ml-6 list-disc [&>li]:mt-2"
    {...props}
  />
)

export const StyledOL = (props: any) => (
  <ol
    className="my-6 ml-6 list-decimal [&>li]:mt-2"
    {...props}
  />
)

export const StyledBlockquote = (props: any) => (
  <blockquote
    className="my-6 border-l-4 pl-4 italic text-muted-foreground"
    {...props}
  />
)

export const StyledCode = (props: any) => {
  // code block
  if (typeof props.children === 'string' && props.children.includes('\n')) {
    return <pre className="bg-muted text-muted-foreground p-4 my-6 overflow-x-auto"><code {...props} /></pre>;
  }

  // inline code
  return (
    <code
      className="relative bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    />
  )
}


