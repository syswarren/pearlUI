import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login6 = () => {
  return (
    <section className="relative py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-sm p-6">
            <div className="mb-6 flex flex-col items-center text-center">
              <Link href="/" className="mb-6 flex items-center gap-2">
                <Image src="/pearl-logo.svg" alt="Pearl logo" width={42} height={42} style={{ filter: 'var(--logo-filter)' }} />
              </Link>
              <h1 className="text-2xl font-bold">Login</h1>
            </div>
            <div>
              <div className="grid gap-4">
                <Input type="email" placeholder="Enter your email" required />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                />

                <Button type="submit" className="mt-4 w-full">
                  Sign in
                </Button>

                <Button variant="secondary" className="w-full">
                  <FcGoogle className="mr-2 size-5" />
                  Sign up with Google
                </Button>
              </div>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Don&apos;t have an account?</p>
                <a
                  href="#"
                  className="font-medium text-primary hover:underline"
                >
                  Signup
                </a>
              </div>
              <a
                href="#"
                className="mt-3 flex justify-center text-sm font-medium hover:underline"
              >
                Forgot password
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login6 };
