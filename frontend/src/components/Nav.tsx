import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import {useState} from "react";

export default function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
		  <NavbarContent>
			<NavbarMenuToggle
			  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
			  className="sm:hidden"
			/>
			<NavbarBrand>
			  <p className="font-bold text-inherit">ACME</p>
			</NavbarBrand>
		  </NavbarContent>
	
		  <NavbarContent className="hidden sm:flex gap-4" justify="center">
			<NavbarItem>
			  <Link color="foreground" href="#">
				Features
			  </Link>
			</NavbarItem>
			<NavbarItem isActive>
			  <Link href="#" aria-current="page">
				Customers
			  </Link>
			</NavbarItem>
			<NavbarItem>
			  <Link color="foreground" href="#">
				Integrations
			  </Link>
			</NavbarItem>
		  </NavbarContent>
		  <NavbarContent justify="end">
			<NavbarItem className="hidden lg:flex">
			  <Link href="#">Login</Link>
			</NavbarItem>
			<NavbarItem>
			  <Button as={Link} color="primary" href="#" variant="flat">
				Sign Up
			  </Button>
			</NavbarItem>
		  </NavbarContent>
		  <NavbarMenu>
			{["test"].map((item, index) => (
			  <NavbarMenuItem key={`${item}-${index}`}>
				<Link
				  color={
					index === 2 ? "primary" : index === ["test"].length - 1 ? "danger" : "foreground"
				  }
				  className="w-full"
				  href="#"
				  size="lg"
				>
				  {item}
				</Link>
			  </NavbarMenuItem>
			))}
		  </NavbarMenu>
		</Navbar>
	  );
}