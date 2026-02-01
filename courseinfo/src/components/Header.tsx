interface HeaderProps {
  name: string
}

const Header = ({ name }: HeaderProps) => {
  //   console.log('header says hi')
  return <h1>{name}</h1>
}

export default Header
