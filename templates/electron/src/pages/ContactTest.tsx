import { ContactForm } from '../lib/ui-core';

export default function ContactTestPage() {
  const handleSubmit = async (data: any) => {
    console.log('Electron ContactForm submission:', data);
    alert('Form submitted successfully in Electron!');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Electron ContactForm Test</h1>
          <p className="text-muted-foreground">
            Testing the ContactForm component in Electron environment
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8">
          <ContactForm 
            title="Electron Contact Form"
            description="This form is running in Electron with native integration"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}