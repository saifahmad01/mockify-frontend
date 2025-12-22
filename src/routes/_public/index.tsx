import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Zap, Shield } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Monitor } from 'lucide-react';
import { Snowflake } from 'lucide-react';
import { Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/_public/')({
  component: IndexPage,
});

function IndexPage() {

  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Mock Data Generation
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Create schemas, generate mock data, and access it via RESTful API.
            Perfect for development and testing.
          </p>
        </div>
        {/* Only show when user is NOT logged in */}
        {!isAuthenticated && (
        <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="gap-2 cursor-pointer">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="cursor-pointer" variant="outline">
                Sign In
              </Button>
            </Link>
        </div>
        )}
      </section>


      <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Describe your API on GitHub ...
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
           Use our DSL to describe your API. You can use 200+ random generators or your own data to create a custom API in a few lines.
          </p>
        </div>
      </section>

      <div className="flex justify-center items-center min-h-screen  p-8">
      {/* Main Window Container */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden font-mono text-sm leading-6">
        
        {/* Window Header / Toolbar */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-white">
          {/* Traffic Light Buttons */}
          <div className="flex gap-2 absolute">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          
          {/* URL Bar */}
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-100 text-gray-600 px-4 py-1 rounded-md text-xs font-medium">
              github.com/acme/front-app/mockify.yml
            </div>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="p-6 overflow-x-auto text-gray-800">
          <pre>
            <code>
              {/* Line 1: Comment */}
              <span className="text-gray-400"># Mockify configuration file</span>
              {'\n'}

              {/* Line 2: Key Value Comment */}
              <span className="text-green-600">key:</span> <span className="text-blue-900 font-semibold">SECRET_KEY</span> <span className="text-gray-400"># Secure your API (optional)</span>
              {'\n'}

              {/* Line 3: Models */}
              <span className="text-green-600">models:</span>
              {'\n'}

              {/* Line 4: User */}
              <span className="pl-4 text-green-700">User:</span>
              {'\n'}

              {/* Line 5: Fake generator */}
              <span className="pl-8 text-green-600">fake:</span> <span className="text-gray-400"># 100+ random generators</span>
              {'\n'}

              {/* Line 6: Count */}
              <span className="pl-12 text-green-600">_count:</span> <span className="text-blue-600">50</span> <span className="text-gray-400"># Generate 50 users</span>
              {'\n'}

              {/* Line 7: Name */}
              <span className="pl-12 text-green-600">name:</span> <span className="text-blue-900">fullName</span>
              {'\n'}

              {/* Line 8: Online */}
              <span className="pl-12 text-green-600">online:</span> <span className="text-blue-900">bool</span>
              {'\n'}

              {/* Line 9: Picture */}
              <span className="pl-12 text-green-600">picture:</span> {'{'} <span className="text-green-600">imageUrl:</span> [ <span className="text-blue-600">48</span>, <span className="text-blue-600">48</span> ] {'}'}
              {'\n'}{'\n'}

              {/* Line 10: Data */}
              <span className="pl-8 text-green-600">data:</span> <span className="text-gray-400"># Use your own data</span>
              {'\n'}

              {/* Line 11: Alice Object */}
              <span className="pl-12 text-gray-800">[ {'{'} </span><span className="text-green-600">name:</span> <span className="text-blue-900">'Alice'</span><span> {'}'} ]</span>
              {'\n'}{'\n'}

              {/* Line 12: Relations */}
              <span className="pl-8 text-green-600">hasMany:</span> <span className="text-blue-900">[Post, Comment]</span> <span className="text-gray-400"># Relations to other models</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
        

<section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
           Get a live API on Mockify!
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
           Always online. Create, read, update and delete with REST or GraphQL. </p>
        </div>
      </section>


  <div className="flex justify-center items-center min-h-screen  p-8">
    <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden font-mono text-sm leading-6">
      {/* Window Header */}
      <div className="relative flex items-center justify-center px-4 py-3 border-b border-gray-100 bg-white">
        <div className="absolute left-4 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="bg-gray-100 text-gray-600 px-4 py-1 rounded-md text-xs font-medium">
          mockify.com/api/acme/front-app/users/1
        </div>
      </div>

      {/* JSON Content */}
      <div className="p-8 overflow-x-auto bg-white">
        <pre>
          <code>
            <div className="text-gray-800 font-bold">{'{'}</div>
            <div className="pl-6">
              <span className="text-blue-600 font-semibold">"id"</span><span className="text-gray-800">: </span><span className="text-blue-800 font-medium">1</span><span className="text-gray-800">,</span>
            </div>
            <div className="pl-6">
              <span className="text-blue-600 font-semibold">"name"</span><span className="text-gray-800">: </span><span className="text-gray-700">"Alice"</span><span className="text-gray-800">,</span>
            </div>
            <div className="pl-6">
              <span className="text-blue-600 font-semibold">"online"</span><span className="text-gray-800">: </span><span className="text-blue-800 font-medium">true</span><span className="text-gray-800">,</span>
            </div>
            <div className="pl-6">
              <span className="text-blue-600 font-semibold">"picture"</span><span className="text-gray-800">: </span><span className="text-gray-700">"https://picsum.photos/48/48"</span>
            </div>
            <div className="text-gray-800 font-bold">{'} '}</div>
          </code>
        </pre>
      </div>
    </div>
    </div>


    <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
           Everything you need
and more.
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
           We focus on the essentials so you can focus on what matters. </p>
        </div>
      </section>

      {/* Detailed Features Grid */}
<section className="container py-24 px-12 justify-center items-center">
  <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
    {/* Feature 1 */}
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
        <Shield className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">Protect your data from competitors</h3>
      <p className="text-muted-foreground leading-relaxed">
        Protecting your data from prying competitors is crucial to the success of any project. 
        While other tools may leak sensitive information, Mockify offers the unique option to make 
        your fake online API completely private and hidden from the rest of the internet. 
        This ensures the confidentiality of your project and safeguards your competitive advantage.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
        <EyeOff className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">No risk of supply-chain attacks</h3>
      <p className="text-muted-foreground leading-relaxed">
        We never read your project source code, as GitHub only allows us access to your config file 
        and nothing more. Unlike other tools that require local installation and leave you vulnerable 
        to supply-chain attacks, you can trust that your project is in safe hands with Mockify.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
        <FileText className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">Interactive docs and online demos</h3>
      <p className="text-muted-foreground leading-relaxed">
        Create functional online documentation and demos effortlessly with Mockify. Eliminate the 
        need to host a server and simply make requests from your static site or mobile app to Mockify. 
        This frees up valuable time to focus on what truly matters - delivering value to your users.
      </p>
    </div>

    {/* Feature 4 */}
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
        <Monitor className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">Keep your environment clean</h3>
      <p className="text-muted-foreground leading-relaxed">
        Enjoy a clean environment with Mockify. Unlike other tools that require local installation 
        and clutter your project with extraneous packages and code, Mockify can be accessed entirely 
        online. This ensures your project stays clean and free of unnecessary bloat, allowing you to 
        focus on writing great code.
      </p>
    </div>

    {/* Feature 5 */}
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
        <Snowflake className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">Immutable data</h3>
      <p className="text-muted-foreground leading-relaxed">
        With Mockify's immutable data architecture, you can ensure that your initial dataset remains 
        protected from modifications by users or hackers. This provides a reliable development environment 
        that allows you to focus on building great products without worrying about constantly resetting 
        or cleaning your data.
      </p>
    </div>

    {/* Feature 6 */}
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
        <Database className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">Persistent data</h3>
      <p className="text-muted-foreground leading-relaxed">
        Alternatively, data in Mockify can be written to a temporary storage and persisted between 
        calls if desired. However, the data can also be easily reset or deleted if needed. [Coming soon]
      </p>
    </div>
  </div>
</section>

<section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
           Always know what you’ll pay,
transparent pricing for everyone.
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
          14-days free trial, cancel at any time.<br />
2 months offered for annual plans. </p>
        </div>
      </section>


{/* Pricing Section */}
      <section className="container py-24 justify-center items-center rightshift">

        <div className="grid gap-8 md:grid-cols-3 lg:gap-8 items-start max-w-7xl mx-auto">
          
          {/* Plan 1: Pro */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-5xl font-bold">$29</h3>
              <p className="font-medium text-xl">Pro</p>
              <p className="text-muted-foreground">Great for freelancers and indie hackers.</p>
            </div>
            <Button variant="outline" className="w-full text-base py-6 rounded-lg border-2">
              Get started
            </Button>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Personal accounts only</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Complete features</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Unlimited servers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Email support</span>
              </li>
            </ul>
          </div>

          {/* Plan 2: Business (Highlighted) */}
          <div className="relative rounded-xl bg-slate-950 text-white shadow-2xl p-8 space-y-6 md:-mt-8 md:mb-8 md:py-12 border border-slate-900 transform md:scale-105 z-10">
            <div className="space-y-2">
              <h3 className="text-5xl font-bold">$99</h3>
              <p className="font-medium text-xl">Business</p>
              <p className="text-blue-200/80">Perfect for companies of any size.</p>
            </div>
            <Button className="w-full text-base py-6 rounded-lg bg-white text-slate-950 hover:bg-slate-100 border-0 font-bold">
              Get started
            </Button>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-white" /> <span>Organization accounts</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-white" /> <span>Unlimited team members</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-white" /> <span>Complete features</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-white" /> <span>Unlimited servers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-white" /> <span>Priority support</span>
              </li>
            </ul>
          </div>

          {/* Plan 3: Custom / Enterprise */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 space-y-6 justify-between center">
            <div className="space-y-2">
              <h3 className="text-5xl font-bold tracking-tight">Custom</h3>
              <p className="font-medium text-xl">Enterprise</p>
              <p className="text-muted-foreground">Need to host your own instance? We can help.</p>
            </div>
            <Button variant="outline" className="w-full text-base py-6 rounded-lg border-2">
              Contact us
            </Button>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>GitHub Enterprise</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Unlimited team members</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Complete features</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Unlimited servers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground/70" /> <span>Priority support</span>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}  
  
