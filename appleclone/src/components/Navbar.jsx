const Navbar = () => {
  return (
    <header className="w-full pb-32 py-5 sm:px-10 px-5 flex justify-between items-center ">
      <nav className="flex flex-1 w-full screen-max-width">
        <img src="/public/assets/images/apple.svg" alt="logo" />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {["Store", "Mac", "Iphone","Support"].map((nav) => {
            return(
              <div key={nav} className="px-5 text-gray-300 text-small
              cursor-pointer hover:text-white">
                {nav}
              </div>
            )
          })}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src="/public/assets/images/search.svg" alt="search"  width={16} />
          <img src="/public/assets/images/bag.svg" alt="bag"  width={16}/> 
        </div>
      </nav>
    </header>
  )
}

export default Navbar
