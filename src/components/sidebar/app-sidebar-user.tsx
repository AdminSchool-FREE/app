"use client";

import { useTheme } from "next-themes";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	ChevronsUpDown,
	LogOut,
	Moon,
	RectangleEllipsis,
	Sun,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { capturarIniciaisNome } from "@/lib/utils";
import { encerrarSessao } from "@/api/session";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogEdicaoSenhaUsuario } from "../dialogs/EdicaoUsuarioDialog";

interface SidebarUserMenuProps {
	id: string;
	nome: string;
	email: string;
	perfil: string;
	carregando?: boolean;
}

export function SidebarUserMenu({ id, nome, email, perfil, carregando }: SidebarUserMenuProps) {
	const queryClient = useQueryClient()

	const { setTheme, theme } = useTheme();
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="focus-visible:ring-0 text-app-azulClaro-950 dark:hover:text-app-azulEscuro-950 bg-app-azulClaro-100 hover:bg-app-azulClaro-200 gap-4 rounded-lg shadow-lg dark:shadow-none"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarFallback className="rounded-lg bg-transparent">{capturarIniciaisNome(nome)}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight ">
								{carregando ? (<Skeleton className="h-4 w-full my-1" />) : (<span className="truncate font-semibold">{nome}</span>)}
								{carregando ? (<Skeleton className="h-4 w-full my-1" />) : (<span className="truncate text-xs">{email}</span>)}
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<Dialog>
							<DialogTrigger asChild>
								<DropdownMenuItem onSelect={(e) => {
									e.preventDefault()
								}} className="gap-3">
									<RectangleEllipsis className="h-[1.2rem] w-[1.2rem]" />
									Alterar senha
								</DropdownMenuItem>
							</DialogTrigger>
							<DialogEdicaoSenhaUsuario dadosUsuario={{
								id,
								nome,
								email,
								perfil: perfil === 'PROFESSOR' ? 'PROFESSOR' : 'ADMIN',
							}} />
						</Dialog>
						<DropdownMenuItem
							className="gap-3"
							onClick={() => setTheme(theme === "light" ? "dark" : "light")}
						>
							<Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							{theme === "light" ? "Modo Escuro" : "Modo Claro"}
						</DropdownMenuItem>
						<DropdownMenuItem
							className="gap-3"
							onClick={async () => {
								queryClient.clear()
								await encerrarSessao()
							}}>
							<LogOut className="h-[1.2rem] w-[1.2rem]" />
							Sair
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
