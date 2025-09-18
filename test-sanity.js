const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "rb1epwnp",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

async function checkData() {
  try {
    const services = await client.fetch('*[_type == "service"]');
    console.log("Services found:", services.length);

    if (services.length > 0) {
      console.log("\nFirst service example:");
      console.log(JSON.stringify(services[0], null, 2));
    }

    const resources = await client.fetch('*[_type == "resource"]');
    console.log("\nResources found:", resources.length);

    if (resources.length > 0) {
      console.log("\nFirst resource example:");
      console.log(JSON.stringify(resources[0], null, 2));
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkData();
