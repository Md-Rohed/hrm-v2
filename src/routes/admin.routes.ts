import { Building2, LayoutDashboard, LucideIcon } from "lucide-react";

type SubRoute = {
    id: number;
    name: string;
    path: string
}

type Route = {
    id: number;
    name: string;
    icon: LucideIcon;
    path?: string;
    children?: SubRoute[];
};

export const adminRoutes: Route[] = [
    {
        id: 1,
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/',
    },
    {
        id: 2,
        name: 'Organization',
        icon: Building2,
        children: [
            {
                id: 2.1,
                name: 'Companies',
                path: '/organization/companies'
            },
            {
                id: 2.2,
                name: 'Departments',
                path: '/organization/departments'
            },
            {
                id: 2.3,
                name: 'Designations',
                path: '/organization/designations'
            },
        ]
    },
]