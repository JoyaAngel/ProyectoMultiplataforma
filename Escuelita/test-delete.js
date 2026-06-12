const http = require('http');

// Test DELETE functionality
async function testDelete() {
    try {
        const testId = Math.floor(Math.random() * 10000000);
        const testCurp = "PRDE" + Math.floor(Math.random() * 100000000).toString().padStart(8, '0') + "ABCD";
        
        // Step 1: Create a test student
        console.log("1. Creando alumno de prueba...");
        console.log("   Test ID:", testId, "| CURP:", testCurp);
        const createRes = await fetch('http://localhost:3000/api/alumnos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                numero_cuenta: testId,
                nombre: "Alumno",
                apellido_paterno: "Prueba",
                apellido_materno: "Delete",
                curp: testCurp,
                sexo: "M",
                correo_electronico: "deletetest@test.com",
                telefono: "5551234567",
                fecha_nacimiento: "2010-01-15",
                id_entidad: 1
            })
        });

        if (!createRes.ok) {
            console.error("Error creando alumno:", createRes.status, await createRes.text());
            return;
        }

        const created = await createRes.json();
        console.log("✅ Alumno creado:", created);

        // Step 2: Verify it exists
        console.log("\n2. Verificando que el alumno existe...");
        const getRes = await fetch('http://localhost:3000/api/alumnos');
        const getData = await getRes.json();
        const students = getData.data || getData;
        const found = students.find(s => s.numero_cuenta === testId);
        console.log("✅ Alumno encontrado en BD:", found ? "SI" : "NO");

        // Step 3: Delete the student
        console.log("\n3. Eliminando alumno...");
        const deleteRes = await fetch(`http://localhost:3000/api/alumnos/${testId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!deleteRes.ok) {
            console.error("Error eliminando:", deleteRes.status, await deleteRes.text());
            return;
        }

        const deleted = await deleteRes.json();
        console.log("✅ Alumno eliminado:", deleted);

        // Step 4: Verify it's gone
        console.log("\n4. Verificando que el alumno fue eliminado...");
        const finalRes = await fetch('http://localhost:3000/api/alumnos');
        const finalData = await finalRes.json();
        const finalStudents = finalData.data || finalData;
        const stillExists = finalStudents.find(s => s.numero_cuenta === testId);
        console.log("✅ Alumno aún existe:", stillExists ? "SI (ERROR)" : "NO (CORRECTO)");

        console.log("\n✅ PRUEBA DELETE COMPLETADA EXITOSAMENTE");
        process.exit(0);
    } catch (error) {
        console.error("Error en test:", error);
        process.exit(1);
    }
}

testDelete();
